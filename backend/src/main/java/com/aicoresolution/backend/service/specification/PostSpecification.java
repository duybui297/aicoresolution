package com.aicoresolution.backend.service.specification;

import com.aicoresolution.backend.entity.CmsUser;
import com.aicoresolution.backend.entity.Post;
import com.aicoresolution.backend.entity.PostStatus;
import com.aicoresolution.backend.entity.UserRole;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import java.time.LocalDateTime;
import java.util.Collection;

public class PostSpecification {

    public static Specification<Post> hasSearchQuery(String query) {
        return (root, q, cb) -> {
            if (query == null || query.isBlank()) return null;
            String pattern = "%" + query.toLowerCase() + "%";
            
            // Search in title
            jakarta.persistence.criteria.Predicate titlePredicate = cb.like(cb.lower(root.get("title")), pattern);
            
            // Search in author name (CmsUser)
            jakarta.persistence.criteria.Subquery<Long> userSubquery = q.subquery(Long.class);
            jakarta.persistence.criteria.Root<CmsUser> userRoot = userSubquery.from(CmsUser.class);
            userSubquery.select(userRoot.get("id"));
            userSubquery.where(cb.like(cb.lower(userRoot.get("fullName")), pattern));
            
            jakarta.persistence.criteria.Predicate authorPredicate = cb.in(root.get("authorId")).value(userSubquery);
            
            return cb.or(titlePredicate, authorPredicate);
        };
    }

    public static Specification<Post> hasStatusIn(Collection<PostStatus> statuses) {
        return (root, query, cb) -> {
            if (statuses == null || statuses.isEmpty()) return null;
            return root.get("status").in(statuses);
        };
    }

    public static Specification<Post> isNotDeleted() {
        return (root, query, cb) -> cb.isNull(root.get("deletedAt"));
    }

    public static Specification<Post> createdAtBetween(LocalDateTime start, LocalDateTime end) {
        return (root, query, cb) -> {
            if (start == null && end == null) return null;
            if (start != null && end != null) return cb.between(root.get("createdAt"), start, end);
            if (start != null) return cb.greaterThanOrEqualTo(root.get("createdAt"), start);
            return cb.lessThanOrEqualTo(root.get("createdAt"), end);
        };
    }

    public static Specification<Post> authorHasRole(UserRole role) {
        return (root, query, cb) -> {
            if (role == null) return null;
            jakarta.persistence.criteria.Subquery<Long> userSubquery = query.subquery(Long.class);
            jakarta.persistence.criteria.Root<CmsUser> userRoot = userSubquery.from(CmsUser.class);
            userSubquery.select(userRoot.get("id"));
            userSubquery.where(cb.equal(userRoot.get("role"), role));
            return cb.in(root.get("authorId")).value(userSubquery);
        };
    }
}
