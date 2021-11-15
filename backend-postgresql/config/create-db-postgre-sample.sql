CREATE TABLE users 
(
    id_user SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE, 
    pass VARCHAR(255) NOT NULL, 
    is_admin BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL
);

CREATE TABLE posts 
(
    id_post SERIAL PRIMARY KEY,
    id_user INT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    date_post TIMESTAMP NOT NULL, 
    title VARCHAR(100) NOT NULL,
    content TEXT,
    img VARCHAR(250),
    CONSTRAINT fk_id_user_p
        FOREIGN KEY (id_user)
        REFERENCES users(id_user) ON DELETE CASCADE
);

CREATE TABLE comments 
(
    id_comment SERIAL PRIMARY KEY,
    id_post INT NOT NULL,
    id_user INT,
    is_active BOOLEAN DEFAULT true, 
    date_comment TIMESTAMP NOT NULL, 
    content_comment TEXT NOT NULL,
    CONSTRAINT fk_id_post_c
        FOREIGN KEY (id_post)
        REFERENCES posts(id_post) ON DELETE CASCADE,
    CONSTRAINT fk_id_user_c
        FOREIGN KEY (id_user)
        REFERENCES users(id_user) ON DELETE SET NULL
);


CREATE TYPE vote AS ENUM ('like', 'dislike');

CREATE TABLE IF NOT EXISTS votes
(
    id_vote BIGSERIAL PRIMARY KEY,
    id_post INT NOT NULL,
    id_user INT,
    vote VOTE,
    CONSTRAINT unique_vote UNIQUE (id_post, id_user),
    CONSTRAINT fk_id_post_v
        FOREIGN KEY (id_post)
        REFERENCES posts(id_post) ON DELETE CASCADE,
    CONSTRAINT fk_id_user_v
        FOREIGN KEY (id_user)
        REFERENCES users(id_user) ON DELETE SET NULL
);

INSERT INTO users (email, pass, is_admin, is_active, lastname, firstname) VALUES
('XuUGXCyDnb4NfSVk3OeDxXjM6s7qC3Coz4SYUyiCYic=', '$2b$10$9OkKjBuMTQpGr/f1YQFysusiE2r9QvfMrKSSUY7bBdsr5Wu/hLG12', true, true, 'admin', '1'),
('ah/1zOginBbx+i2b3HTdkOf78aTINQ6pYuMvSHiMnHE=', '$2b$10$huBk.26upIA5skgc3SQZFumkl2ZlX.FFTKFfHRGU28mg8FvjChKYS', true, true, 'admin', '2'),
('HZOuw1iQ9960YPU9/dWxrcB9oq0gTLhmq8dH7UM8Pbo=', '$2b$10$OFMQROLYuHFnHXQYfWJMjuhZhjuYdGTrdQXMQ5LdFJksbDx.yj/2q', false, true, 'Rodolfo', 'Elmer '),
('ieNsMgErPGMSa9ohL6PLv1JuapGr90EmiXuc40S0hyc=', '$2b$10$Kvthr9sUAH/sA7AwSzDZ4.iN7aB7ZKrDzlbO3/GjOKlRTpmNmDRV2', false, true, 'Evalyn ', 'Erik'),
('uw/dfMJlupqzIE3ZIM+KCdkNXcNDyeGXbjtDqNhjjoo=', '$2b$10$jU8ixNb4.BtKlTJQ4ql4..71sf07OQ.6gJr990KGiePfwFi29tJAS', false, true, 'Boniface', 'Jeanne'),
('sBgMtq8Q+QWzUjTv/L8xAITqdbl3jqGyPCooA1klT+c=', '$2b$10$gp98gSFhkVXLMl.YEs9ttu.8fK3m8uK6lKAx.Bnp6fG24u2UZ2tuy', false, true, 'Jayson ', 'Francis ');


INSERT INTO posts (id_user, is_active, date_post, title, content, img) VALUES
(4, true, '2021-09-09 18:07:18', 'Première publication', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ...', 'http://localhost:3000/images/yiran-yang-lo_pwIr9U1k-unsplash_1631203638131.jpg'),
(4, true, '2021-09-09 18:09:21', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 'http://localhost:3000/images/ardalan-hamedani-stHJWyuclTA-unsplash_1631203761511.jpg'),
(6, true, '2021-09-09 18:14:53', 'Sed ut perspiciatis unde omnis iste natus error', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse', 'http://localhost:3000/images/thor-alvis-sgrCLKYdw5g-unsplash_1631204093622.jpg');


INSERT INTO comments (id_post, id_user, is_active, date_comment, content_comment) VALUES
(1, 3, true, '2021-09-09 18:10:56', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'),
(2, 3, true, '2021-09-09 18:11:40', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
(2, 5, true, '2021-09-09 18:12:20', 'sunt in culpa qui officia deserunt mollit anim id est laborum'),
(2, 6, true, '2021-09-09 18:15:11', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do'),
(3, 6, true, '2021-09-09 18:15:30', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'),
(3, 3, true, '2021-09-09 18:42:28', 'Lorem ipsum dolor sit amet. Qui voluptatem consequatur in quia quis qui praesentium blanditiis. Qui voluptates nihil id voluptatem animi ut tempora recusandae eos deleniti voluptatem ea temporibus labore non distinctio veniam non vero nihil.'),
(2, 4, true, '2021-09-09 19:37:38', 'Qui veritatis quas est beatae error qui dignissimos dicta ad illum porro. Ad galisum'),
(2, 3, true, '2021-09-09 19:38:25', 'Qui tempore officia eos tenetur consequatur et neque ipsa.');


INSERT INTO votes (id_post, id_user, vote) VALUES
(2, 6, 'like'),
(1, 6, 'dislike'),
(3, 6, 'dislike'),
(3, 5, 'like'),
(1, 3, 'like'),
(3, 3, 'like'),
(2, 3, 'dislike'),
(3, 4, 'like'),
(1, 5, 'like'),
(2, 5, 'dislike'),
(3, 1, 'like'),
(3, 2, 'like');