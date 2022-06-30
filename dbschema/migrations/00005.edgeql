CREATE MIGRATION m1bcnmxshf3ogrjnrstxdldi5y3mlhy2ctfsin4ucfgodufvyspgfq
    ONTO m1ywzep2vvyygbjwnax2do6fwdhu3p62dyutoyyumx5p5q3a5i5sha
{
  ALTER TYPE default::Inventory {
      ALTER LINK owner {
          ON TARGET DELETE  DELETE SOURCE;
      };
  };
  ALTER TYPE default::UserCharacter {
      ALTER LINK owner {
          ON TARGET DELETE  DELETE SOURCE;
      };
  };
};
