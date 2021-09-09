
CREATE TABLE IF NOT EXISTS users 
(
    id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(50) NOT NULL UNIQUE, 
    pass VARCHAR(255) NOT NULL, 
    is_admin BOOLEAN DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;


CREATE TABLE IF NOT EXISTS posts 
(
    id_post INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    date_post DATETIME NOT NULL, 
    title VARCHAR(100) NOT NULL,
    content TEXT,
    img VARCHAR(250),
    CONSTRAINT fk_id_user_p
        FOREIGN KEY (id_user)
        REFERENCES users(id_user) ON DELETE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;


CREATE TABLE IF NOT EXISTS comments 
(
    id_comment INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_post INT NOT NULL,
    id_user INT,
    is_active BOOLEAN DEFAULT 1, 
    date_comment DATETIME NOT NULL, 
    content_comment TEXT NOT NULL,
    CONSTRAINT fk_id_post_c
        FOREIGN KEY (id_post)
        REFERENCES posts(id_post) ON DELETE CASCADE,
    CONSTRAINT fk_id_user_c
        FOREIGN KEY (id_user)
        REFERENCES users(id_user) ON DELETE SET NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;


CREATE TABLE IF NOT EXISTS votes
(
    id_vote BIGINT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    id_post INT NOT NULL,
    id_user INT,
    vote ENUM('like', 'dislike') NOT NULL,
    CONSTRAINT unique_vote UNIQUE (id_post, id_user),
    CONSTRAINT fk_id_post_v
        FOREIGN KEY (id_post)
        REFERENCES posts(id_post) ON DELETE CASCADE,
    CONSTRAINT fk_id_user_v
        FOREIGN KEY (id_user)
        REFERENCES users(id_user) ON DELETE SET NULL
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;


INSERT INTO `users` 
    (`id_user`, `email`, `pass`, `is_admin`, `is_active`, `lastname`, `firstname`)
    VALUES 
            (NULL, 'XuUGXCyDnb4NfSVk3OeDxXjM6s7qC3Coz4SYUyiCYic=', '$2b$10$9OkKjBuMTQpGr/f1YQFysusiE2r9QvfMrKSSUY7bBdsr5Wu/hLG12', '1', '1', 'admin', '1'), 
            (NULL, 'ah/1zOginBbx+i2b3HTdkOf78aTINQ6pYuMvSHiMnHE=', '$2b$10$huBk.26upIA5skgc3SQZFumkl2ZlX.FFTKFfHRGU28mg8FvjChKYS', '1', '1', 'admin', '2') 
