insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (1, 'Nico', 'Obermair', 'nicooo2302', 'nico.obermair@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f', '2005-02-23', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (2, 'Felix', 'Arzt', 'oarztla', 'felix.arzt@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f', '2004-11-15', true);

--password 12342

insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (3, 'Nico', 'Obermair', 'nicooo2302', 'nico.obermair@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f', '2005-02-23', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (4, 'Felix', 'Arzt', 'oarztla', 'felix.arzt@gmail.com', '307fd56085a6ed891cfb2c38276d7853b122968754378f1153e0127f3a764a0f', '2004-11-15', true);
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
/*insert into event(ispublic, bannerimg_id, enddate, group_id, id, owner_id, startdate, ticketpreis, beschreibung, eventname, kategorie, location, locationcords, veranstalter) values(true, null, null, 1, 101, null, null, 10, 'Das ist ein Event', 'Event 2', 'String', 'String', 'String', 'String');
*/

drop sequence customer_seq RESTRICT ;
create sequence customer_seq start with 100;

drop sequence event_seq RESTRICT ;
create sequence event_seq start with 100;