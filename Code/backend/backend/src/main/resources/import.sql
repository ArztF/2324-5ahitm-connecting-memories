insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (1, 'Nico', 'Obermair', 'nicooo2302', 'nico.obermair@gmail.com', 'Nico2302', '2005-02-23', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (2, 'Felix', 'Arzt', 'oarztla', 'felix.arzt@gmail.com', 'oarztla', '2004-11-15', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (3, 'Philip', 'Kirchmair', 'kirchi04', 'philipkirch.pk.@gmail.com', 'Kirchmair0807', '2004-07-08', true);
insert into CUSTOMER (ID, vorname, nachname, username, email, password, geburtsdatum, isVeranstalter) VALUES (4, 'Simon', 'Elmecker', 'elmeckerNich', 'elmeckerS.@gmail.com', 'Selmecker05', '2005-08-10', true);

insert into EVENT (ID, eventname, location, locationcords, bannerimg, startdate, enddate, beschreibung, kategorie, veranstalter, ticketpreis, isPublic,owner, participantList) VALUES
                                                                                                                                                       (1, 'Test', 'test', 'test', 'test', '2023-10-12 00:00:00', '2023-10-12 00:00:00', 'test', 'test', 'test', 10, true,1, 1);
insert into EVENT (ID, eventname, location, locationcords, bannerimg, startdate, enddate, beschreibung, kategorie, veranstalter, ticketpreis, isPublic,owner, participantList) VALUES
    (2, 'Projekt-Award', 'HTL Leonding', 'Leonding', 'leonding.jpg', '2023-12-12 00:12:00', '2023-12-12 00:15:00', 'Projekte der 4ten und 5ten Klassen werden vorgestellt', 'Schulveranstaltung', 'HTL Leonding', 10, true, 3, 2);

insert into EVENT (ID, eventname, location, locationcords, bannerimg, startdate, enddate, beschreibung, kategorie, veranstalter, ticketpreis, isPublic, owner, participantList) VALUES
    (3, 'Geburstagsfeier','Jederman','Schwannenstadt', 'schwana.jpg', '2023-12-02 00:00:00', '2023-12-03 00:00:00', 'orztla sein Geburtstag noch feiern weil ma geil san', 'Geburtstagsfeier', 'Orztla', 5, true,2,3);

insert into PARTICIPANTS(ID,CUSTOMER,EVENT) VALUES (1,2,3)

insert into PARTICIPANTS(ID,CUSTOMER,EVENT) VALUES (2,3,3)

insert into PARTICIPANTS(ID,CUSTOMER,EVENT) VALUES (3,3,3)


drop sequence customer_seq RESTRICT ;
create sequence customer_seq start with 100;

drop sequence event_seq RESTRICT ;
create sequence event_seq start with 100;

drop sequence participants_seq RESTRICT ;
create sequence participants_seq start with 100;