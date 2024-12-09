create database pagueDepois;
use pagueDepois;
create table cliente(
	cpf int(11) primary key not null,
    nome varchar(30) not null,
    data_nasc date not null, 
    telefone varchar(12)
);

create table divida(
	id int primary key not null auto_increment,
    valor float(10) not null,
	id_cliente int not null,
    id_compras int not null,
    foreign key (id_cliente) references cliente(cpf),
	foreign key (id_compras) references compras(id)
);

create table produtos_loja(
	id int primary key not null auto_increment,
    nome varchar(20) not null,
	quantidade int(20) not null,
    valor_prod float not null
);

create table compras(
	id int primary key not null auto_increment,
	valorTotal float not null,
    data_compra date not null
);

select * from cliente;
