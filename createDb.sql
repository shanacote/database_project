-- mysql -uroot -ppassword
-- use db_project
show databases;
DROP DATABASE db_project;
CREATE DATABASE db_project;
use db_project
show tables;

drop table major;
create table major (
     Major_ID INT NOT NULL AUTO_INCREMENT,
     Name VARCHAR(255) NOT NULL,
     -- createdAt datetime NOT NULL,
     -- updatedAt datetime NOT NULL,
     PRIMARY KEY(Major_ID)
);
desc major;
-- insert into major (Name, createdAt, updatedAt) values ('Computer Science', curdate(), curdate());
insert into major (Name) values ('Computer Science');
insert into major (Name) values ('Biology');
insert into major (Name) values ('Finance');
insert into major (Name) values ('Accounting');
insert into major (Name) values ('Sociology');
insert into major (Name) values ('Psychology');
insert into major (Name) values ('Law');
insert into major (Name) values ('Marketing');
insert into major (Name) values ('Economics');
insert into major (Name) values ('Graphic Design');


drop table student;
create table student (
     Student_ID INT NOT NULL AUTO_INCREMENT,
     Name VARCHAR(50) NOT NULL,
     Major_id INT NOT NULL,
     PRIMARY KEY(Student_ID),
     CONSTRAINT student_major_fk FOREIGN KEY (Major_id) REFERENCES major(Major_ID)
);

desc student;
insert into student values (1, 'Shana', 1);
insert into student values (2, 'Joe', 2);
insert into student values (3, 'George', 3);
insert into student values (4, 'Blake', 4);
insert into student values (5, 'Scarlett', 5);
insert into student values (6, 'Kate', 6);
insert into student values (7, 'Rosie', 7);
insert into student values (8, 'Lucas', 8);
insert into student values (9, 'Claire', 9);
insert into student values (10, 'Brad', 10);

-- drop table department;
-- create table department (
--      Dept_ID INT NOT NULL,
--      Name VARCHAR(50) NOT NULL,
--      School VARCHAR(50) NOT NULL,
--      Major_id INT NOT NULL,
--      PRIMARY KEY(ID)
-- );
-- desc department;
-- insert into department values (1, 'Computer Science', CAS, );

drop table course;
create table course (
     course_id INT NOT NULL AUTO_INCREMENT,
     school_code VARCHAR(50) NOT NULL,
     Major_id INT NOT NULL,
     Course_code VARCHAR(50) NOT NULL,
     Name VARCHAR(50) NOT NULL,
     PRIMARY KEY(course_id),
     FOREIGN KEY (Major_id)
          REFERENCES major(Major_ID)
);
desc course;
insert into course values (1, 'CAS', 1, 'CMPSC-310', 'Introduction to Data Science');
insert into course values (2, 'CAS', 1, 'CMPSC-F107', 'Ants, Rumors, and Gridlocks');
insert into course values (3, 'CAS', 1, 'CMPSC-F131', 'Computer Science I');
insert into course values (4, 'CAS', 1, 'CMPSC-F132', 'Computer Science II');
insert into course values (5, 'CAS', 1, 'CMPSC-F265', 'Data Structures & Algorithms');
insert into course values (6, 'CAS', 1, 'CMPSC-F331', 'Object Oriented Programming');
insert into course values (7, 'CAS', 1, 'CMPSC-F353', 'Architecture of Computer Systems');
insert into course values (8, 'CAS', 1, 'CMPSC-F355', 'Operating Systems');
insert into course values (9, 'CAS', 1, 'CMPSC-F363', 'Introduction to Database Systems');
insert into course values (10, 'CAS', 1, 'CMPSC-F375', 'Introduction to Computer Networks');
insert into course values (11, 'SBS', 4, 'ACCT-201', 'Accounting for Decision Making I');

drop table sport;
create table sport (
     Sport_ID INT NOT NULL AUTO_INCREMENT,
     Gender VARCHAR(50) NOT NULL,
     Sport VARCHAR(50) NOT NULL,
     Season VARCHAR(50) NOT NULL,
     PRIMARY KEY(Sport_ID)
);
desc sport;
insert into sport values (1, 'Womens', 'Hockey', 'Winter');
insert into sport values (2, 'Womens', 'Basketball', 'Winter');
insert into sport values (3, 'Womens', 'Softball', 'Spring');
insert into sport values (4, 'Womens', 'Soccer', 'Fall');
insert into sport values (5, 'Womens', 'Volleyball', 'Fall');
insert into sport values (6, 'Mens', 'Hockey', 'Winter');
insert into sport values (7, 'Mens', 'Basketball', 'Winter');
insert into sport values (8, 'Mens', 'Baseball', 'Spring');
insert into sport values (9, 'Mens', 'Soccer', 'Fall');
insert into sport values (10, 'Mens', 'Golf', 'Fall');


drop table club;
create table club (
     Club_ID INT NOT NULL AUTO_INCREMENT,
     Name VARCHAR(50) NOT NULL,
     Type VARCHAR(50) NOT NULL,
     PRIMARY KEY(Club_ID)
);
desc club;
insert into club values (1,'Suffolk Investments Club (SUIC)', 'academic interests');
insert into club values (2,'Finance Club', 'academic interests');
insert into club values (3,'Suffolk Fashion', 'special interest');
insert into club values (4,'Russian Speakers Community Club', 'cultural');
insert into club values (5,'Student Athletic Advisory Committee (SAAC)', 'programming/governing boards');
insert into club values (6,'Alpha Sigma Alpha (ΑΣΑ)', 'fraternity/sorority life');
insert into club values (7,'Suffolk Journal', 'media groups');
insert into club values (8,'Women in Government (WIGS)', 'political');
insert into club values (9,'UNICEF', 'social justice/community service');
insert into club values (10,'Drone Club', 'special interests');

drop table student_courses_relation;
create table student_courses_relation (
     Student_ID INT NOT NULL,
     course_id INT NOT NULL,
     FOREIGN KEY (Student_ID)
        REFERENCES student(Student_ID),
     FOREIGN KEY (course_id)
        REFERENCES course(course_id)
);
desc student_courses_relation;
insert into student_courses_relation values (1, 1);
insert into student_courses_relation values (1, 2);
insert into student_courses_relation values (1, 3);
insert into student_courses_relation values (1, 4);
insert into student_courses_relation values (1, 5);
insert into student_courses_relation values (1, 6);
insert into student_courses_relation values (1, 7);
insert into student_courses_relation values (1, 8);
insert into student_courses_relation values (1, 9);
insert into student_courses_relation values (1, 10);
insert into student_courses_relation values (4, 11);

drop table student_sport_relation;
create table student_sport_relation (
     Student_ID INT NOT NULL,
     Sport_ID INT NOT NULL,
     FOREIGN KEY (Student_ID)
        REFERENCES student(Student_ID),
     FOREIGN KEY (Sport_ID)
        REFERENCES sport(Sport_ID)
);
desc student_sport_relation;
insert into student_sport_relation values (1, 1);
insert into student_sport_relation values (2, 7);
insert into student_sport_relation values (3, 8);
insert into student_sport_relation values (4, 6);
insert into student_sport_relation values (5, 4);
insert into student_sport_relation values (6, 5);
insert into student_sport_relation values (7, 3);
insert into student_sport_relation values (8, 10);
insert into student_sport_relation values (9, 2);
insert into student_sport_relation values (10, 9);


drop table student_club_relation;
create table student_club_relation (
     Student_ID INT NOT NULL,
     Club_ID INT NOT NULL,
     FOREIGN KEY (Student_ID)
        REFERENCES student(Student_ID),
     FOREIGN KEY (Club_ID)
        REFERENCES club(Club_ID)
);
desc student_club_relation;
insert into student_club_relation values (1, 5);
insert into student_club_relation values (2, 2);
insert into student_club_relation values (3, 3);
insert into student_club_relation values (4, 4);
insert into student_club_relation values (5, 6);
insert into student_club_relation values (6, 7);
insert into student_club_relation values (7, 8);
insert into student_club_relation values (8, 9);
insert into student_club_relation values (9, 10);
insert into student_club_relation values (10, 1);

student_courses_relation
========================
123, CAS, Computer Science, Databases
456, CAS, Computer Science, Databases
123, Business, Accounting, Accounting101

student_sport_relation
======================
123, hockey
456, hockey

student_club_relation
=====================
999, club sports, hockey
999, academic interests,  Suffolk Investments Club (SUIC), Business, Finance


insert into student values (1, 'Shana', 1);
insert into student values (2, 'John', 1);

#create constraint xyz t1, fk1, t2, fk2  



quit;
