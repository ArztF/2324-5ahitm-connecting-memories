/*INSERT INTO Image (id,imageName, imageData) VALUES
                                             (1,'Banner1', 'x0123456789ABCDEF'), -- Replace '\\x0123456789ABCDEF' with your actual binary data
                                             (2,'Banner2', 'x0123456789ABCDEF');*/


insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (1, 'Nico', 'Obermair', 'nicooo2302', 'nico.obermair@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f', '2005-02-23', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (2, 'Felix', 'Arzt', 'oarztla', 'felix.arzt@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f', '2004-11-15', true);

--password 12342

insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (3, 'Alexander', 'Zauner', 'zauner007', 'alex.zauner@gmail.com', '133987b0b6ad0c01fc0ccbdae1b95449', '2005-4-10', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (4, 'Tobias', 'Stadler', 'stadla010', 'stadla.T@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f', '2004-09-12', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (5, 'Philip', 'Kirchmair', 'kirchi04', 'philipkirch.pk.@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f', '2004-07-08', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (6, 'Simon', 'Elmecker', 'elmeckerNich', 'elmeckerS.@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f', '2005-08-10', true);

/*
insert into GROUPPARTICIPANT (ID, eventgroup_id, customer_id) VALUES (1, 1, 2)
insert into GROUPPARTICIPANT (ID, eventgroup_id, customer_id) VALUES (2, 1, 3)
insert into GROUPPARTICIPANT (ID, eventgroup_id, customer_id) VALUES (2, 1, 4)
insert into GROUPPARTICIPANT (ID, eventgroup_id, customer_id) VALUES (2, 1, 5)

insert into EVENT (ID, eventname, location, locationcords, startdate, enddate, beschreibung, kategorie, veranstalter, ticketpreis, isPublic) VALUES
                                                                                                                                                       (1, 'Test', 'test', 'test', '2023-10-12 00:00:00', '2023-10-12 00:00:00', 'test', 'test', 'test', 10, true);

insert into EVENT (ID, eventname, location, locationcords, startdate, enddate, beschreibung, kategorie, veranstalter, ticketpreis, isPublic) VALUES
    (2, 'Test2', 'test2', 'test2', '2023-10-12 00:00:00', '2023-10-12 00:00:00', 'test', 'test', 'test', 10, true);
insert into EVENT (ID, eventname, location, locationcords, startdate, enddate, beschreibung, kategorie, veranstalter, ticketpreis, isPublic) VALUES
    (3, 'Test3', 'test3', 'test3', '2023-10-12 00:00:00', '2023-10-12 00:00:00', 'test', 'test', 'test', 10, true);
*/
INSERT INTO EventGroup (id,groupName, description, owner_id, image_id) VALUES
                                                                        (1,'Group1', 'Description1', 1, 1),
                                                                        (2,'Group2', 'Description2', 2, 2);
                                                                        -- Add more rows as needed.

-- Insert data into GroupParticipant table
INSERT INTO GroupParticipant (id,customer_id, eventgroup_id) VALUES
    (1, 1,1),
    (2, 2,2);
                                                              -- Add more rows as needed.

-- Insert data into Event table
INSERT INTO Event (id,eventname, location, locationcords, bannerimg_id, startdate, enddate, beschreibung, kategorie, veranstalter, ticketpreis, isPublic, owner_id, group_id) VALUES
    (1,'Event1', 'Location1', 'Coordinates1', 1, '2023-10-12 00:00:00', '2023-10-12 00:00:00', 'Description1', 'Category1', 'Organizer1', 100, true, 1, 1),
    (2,'Event2', 'Location2', 'Coordinates2', 2, '2023-10-12 00:00:00', '2023-10-12 00:00:00', 'Description2', 'Category2', 'Organizer2', 150, false, 2, 2);
                                                                                                                                                                               -- Add more rows as needed.

-- Insert data into Participants table
INSERT INTO Participants (id,customer_id, event_id) VALUES
    (1, 2,1),
    (2, 3,1);

drop sequence customer_seq RESTRICT ;
create sequence customer_seq start with 100;

drop sequence event_seq RESTRICT ;
create sequence event_seq start with 100;
