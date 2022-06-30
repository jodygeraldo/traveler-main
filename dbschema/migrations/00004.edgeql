CREATE MIGRATION m1ywzep2vvyygbjwnax2do6fwdhu3p62dyutoyyumx5p5q3a5i5sha
    ONTO m1h6hrtidq2jonouw2gge4jc24odymuxjv5jvaxn5ynk47ag22epoq
{
  ALTER TYPE default::Account {
      ALTER LINK owner {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
