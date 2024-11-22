use PagueDepois;

create table cliente(
	cpf int primary key not null auto_increment,
    nome varchar(30) not null,
    idade int(3),
    telefone int(13)
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
    id_produtos int not null,
    foreign key( id_produtos) references produtos_loja(id)
);

select * from divida;