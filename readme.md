Setup guide



in your database run these commands

CREATE TABLE `book\_info` (  `id` int(32) NOT NULL AUTO\_INCREMENT,  `name` varchar(64) NOT NULL,  `author` varchar(64) NOT NULL,  `date\_of\_release` date NOT NULL,  `annotation` varchar(1024) NOT NULL,  `rating` float NOT NULL,  `preview\_image` mediumtext NOT NULL,  `full\_image` longtext NOT NULL,  PRIMARY KEY (`id`)) ENGINE=InnoDB AUTO\_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8\_czech\_ci ROW\_FORMAT=COMPACT





CREATE TABLE `users` (  `id` int(11) NOT NULL AUTO\_INCREMENT,  `username` varchar(64) NOT NULL,  `password\_hash` varchar(255) NOT NULL,  PRIMARY KEY (`id`),  UNIQUE KEY `username` (`username`)) ENGINE=InnoDB AUTO\_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8\_czech\_ci





CREATE TABLE `users` (  `id` int(11) NOT NULL AUTO\_INCREMENT,  `username` varchar(64) NOT NULL,  `password\_hash` varchar(255) NOT NULL,  PRIMARY KEY (`id`),  UNIQUE KEY `username` (`username`)) ENGINE=InnoDB AUTO\_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8\_czech\_ci





in /php/database/connect.php enter your db login





when this is done, run /php/login/create\_user.php to create your admins





the page shoud be now setup with / as the user facing one and /admin as the admin part









to import books from json, put books.json inside core folder with structure as follows: 





\[

&nbsp; {"name":"Alice's Adventures in Wonderland","author":"Lewis Carroll","date\_of\_release":"1865-05-05","annotation":"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer interdum orci sit amet scelerisque auctor. Curabitur hendrerit est vel ligula congue, ut interdum ex tristique. Nullam tempor lorem a nisl tristique tempus. Fusce gravida porta dolor, sed efficitur risus. Mauris auctor eleifend commodo. Integer feugiat convallis neque a dictum. Nullam elementum bibendum sollicitudin. Quisque sagittis, quam sit amet efficitur luctus, risus erat volutpat sem, non venenatis sapien sem et ipsum. Pellentesque diam turpis, finibus non ex vel, dapibus vulputate quam. Praesent lacinia tellus vitae nisl facilisis fringilla. Proin sed sapien et diam volutpat pretium sed in nisi. Donec libero ex, viverra quis nisi eu, tincidunt congue lectus.



Maecenas sit amet massa libero. In eu consectetur nunc, in consequat dui. Donec nulla metus, dignissim quis arcu eget, viverra ullamcorper eros. Integer lorem ex, dictum a justo quis, dictum consectetur purus. Duis non orci commodo, lobortis nibh vitae, accumsan nisl. Quisque et posuere mauris. Aliquam condimentum quis ante et semper. Vestibulum vitae porttitor dui, vitae luctus massa. Pellentesque rutrum diam id aliquam ornare. Morbi viverra libero diam, ut tristique mauris mattis nec. Morbi posuere lacinia nisi, sit amet fringilla odio fringilla id. Phasellus ac pharetra nunc. Nullam ut ipsum metus. Integer vitae elementum nulla. Nulla sodales efficitur felis nec varius.","rating":5,"preview\_image":"\[base64 encoded image upto 1MB, but smaller is better]","full\_image":"\[base64 encoded image upto 8MB]"}

]





