CREATE TABLE categories (
    id CHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    user_id CHAR(36) NOT NULL,
    created_at TIMESTAMP default CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_categories_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);