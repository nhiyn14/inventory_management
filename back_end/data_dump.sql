-- actual password is initial of first and last name
-- password for cienna nguyen is cn
USE stock_inventory;

INSERT INTO `user` VALUES
('fdc9aaa3-c55f-413f-b81f-39199690e233', '2022-10-17 04:08:27', '2022-10-17 04:20:20', 'james', 'honey', 'jh@jh', '373633ec8af28e5afaf6e5f4fd87469b'),
('fdc9aaa3-c55f-413f-b81f-39199690e234', '2022-10-16 04:08:27', '2022-10-16 04:20:20', 'decland', 'noble', 'dn@dn', '567c996739edfa1cdbad4c55a80580df'),
('fdc9aaa3-c55f-413f-b81f-39199690e235', '2022-10-15 04:08:27', '2022-10-15 04:20:20', 'jon', 'clus', 'jc@jc', 'b7adde8a9eec8ce92b5ee0507ce054a4'),
('fdc9aaa3-c55f-413f-b81f-39199690e236', '2022-10-14 04:08:27', '2022-10-14 04:20:20', 'cienna', 'nguyen', 'cn@cn', '7efdfc94655a25dcea3ec85e9bb703fa');

INSERT INTO `product` VALUES
('pdc9aaa3-c55f-413f-b81f-39199690e233', '2022-10-17 04:08:27', '2022-10-17 04:20:20', 'candle1', 'fdc9aaa3-c55f-413f-b81f-39199690e233',
'9.9', '10', 'This is candle1', '14', 'In Stock'),
('pdc9aaa4-c55f-413f-b81f-39199690e233', '2022-10-17 04:08:27', '2022-10-17 04:20:20', 'candle2', 'fdc9aaa3-c55f-413f-b81f-39199690e233',
'8.8', '10', 'This is candle2', '15', 'In Stock'),
('pdc9aaa5-c55f-413f-b81f-39199690e233', '2022-10-17 04:08:27', '2022-10-17 04:20:20', 'candle3', 'fdc9aaa3-c55f-413f-b81f-39199690e233',
'7.7', '10', 'This is candle3', '5', 'Low Stock'),
('adc9aaa3-c55f-413f-b81f-39199690e234', '2022-10-17 04:08:27', '2022-10-17 04:20:20', 'curtain1', 'fdc9aaa3-c55f-413f-b81f-39199690e234',
'98.1', '100', 'This is curtain1', '20', 'In Stock'),
('adc9aaa4-c55f-413f-b81f-39199690e234', '2022-10-17 04:08:27', '2022-10-17 04:20:20', 'curtain2', 'fdc9aaa3-c55f-413f-b81f-39199690e234',
'12.12', '20', 'This is curtain2', '100', 'In Stock'),
('ndc9aaa4-c55f-413f-b81f-39199690e234', '2022-10-17 04:08:27', '2022-10-17 04:20:20', 'comic1', 'fdc9aaa3-c55f-413f-b81f-39199690e236',
'10', '20', 'This is comic1', '0', 'No Stock'),
('ndc9aaa3-c55f-413f-b81f-39199690e234', '2022-10-17 04:08:27', '2022-10-17 04:20:20', 'comic2', 'fdc9aaa3-c55f-413f-b81f-39199690e236',
'15', '20', 'This is comic2', '9', 'Low Stock');

INSERT INTO `sales` VALUES
('ddc9aaa3-c55f-413f-b81f-39199690e233', '2022-10-17 02:08:27', '2022-10-17 02:20:20',
'fdc9aaa3-c55f-413f-b81f-39199690e233', 'pdc9aaa3-c55f-413f-b81f-39199690e233', '10', '2', '20', '0.2'),
('ddc9aaa4-c55f-413f-b81f-39199690e233', '2022-10-17 02:08:27', '2022-10-17 02:20:20',
'fdc9aaa3-c55f-413f-b81f-39199690e236', 'ndc9aaa4-c55f-413f-b81f-39199690e234', '20', '2', '40', '20'),
('ddc9aaa5-c55f-413f-b81f-39199690e233', '2022-10-17 02:08:27', '2022-10-17 02:20:20',
'fdc9aaa3-c55f-413f-b81f-39199690e236', 'ndc9aaa3-c55f-413f-b81f-39199690e234', '20', '2', '40', '10');