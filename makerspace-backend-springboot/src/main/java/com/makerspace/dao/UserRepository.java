package com.makerspace.dao;

import com.makerspace.entity.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Wanqi Chen
 * UserRepository interface help apply SQL for user table.
 */


@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    /**
     * query one user by email
     *
     * @param email the email of user
     * @return User one user
     */
    User findByUserEmail(String email);
}
