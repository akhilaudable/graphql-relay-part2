CREATE TABLE `Books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) DEFAULT NULL,
  `author` varchar(150) DEFAULT NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `Orders`(
	`order_id` int(11) NOT NULL AUTO_INCREMENT,
    `book_id` int(11) DEFAULT NULL,
	`quantity` int(11) DEFAULT NULL,
     `cart` varchar(30) DEFAULT NULL,
    PRIMARY KEY (`order_id`),
    CONSTRAINT `FK_book_id` FOREIGN KEY (`book_id`) REFERENCES `Books`(`id`)
)ENGINE = INNODB DEFAULT CHARSET=utf8;


INSERT INTO `Books` (title, author)
Values ('The Girl with the Dragon Tattoo','Stieg Larsson');

INSERT INTO `Books` (title, author)
Values ('Harry Potter and the Half-Blood Prince','J.K. Rowling');

INSERT INTO `Books` (title, author)
Values ('A Thousand Splendid Suns','Khaled Hosseini');

INSERT INTO `Books` (title, author)
Values ('The Alchemist','Paulo Coelho');

INSERT INTO `Books` (title, author)
Values ('Life of Pi','Yann Martel');

INSERT INTO `Books` (title, author)
Values ('The Girl on the Train','Paula Hawkins');
