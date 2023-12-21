insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (1, 'Nico', 'Obermair', 'nicooo2302', 'nico.obermair@gmail.com', 'd9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e', '2005-02-23', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (2, 'Felix', 'Arzt', 'oarztla', 'felix.arzt@gmail.com', 'd9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e', '2004-11-15', true);

--password 12342

insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (3, 'Nico', 'Obermair', 'nicooo2302', 'nico.obermair@gmail.com', 'd9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e', '2005-02-23', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (4, 'Felix', 'Arzt', 'oarztla', 'felix.arzt@gmail.com', 'd9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e', '2004-11-15', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (5, 'Philip', 'Kirchmair', 'kirchi04', 'philipkirch.pk.@gmail.com', 'd9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e', '2004-07-08', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (6, 'Simon', 'Elmecker', 'elmeckerNich', 'elmeckerS.@gmail.com', 'd9b5f58f0b38198293971865a14074f59eba3e82595becbe86ae51f1d9f1f65e', '2005-08-10', true);

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

drop sequence customer_seq RESTRICT ;
create sequence customer_seq start with 100;

drop sequence event_seq RESTRICT ;
create sequence event_seq start with 100;