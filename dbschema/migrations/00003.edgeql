CREATE MIGRATION m1h6hrtidq2jonouw2gge4jc24odymuxjv5jvaxn5ynk47ag22epoq
    ONTO m13g4z2ezu6knybzp527xmwbpmxltr4uc7qy2o6s3nm3og26ofmkeq
{
  ALTER TYPE default::Account {
      ALTER LINK owner {
          RESET EXPRESSION;
          RESET EXPRESSION;
          ON TARGET DELETE  DELETE SOURCE;
          RESET CARDINALITY;
          SET REQUIRED USING (SELECT
              1
          );
          SET TYPE default::User;
      };
  };
  ALTER TYPE default::Account {
      ALTER LINK owner {
          SET REQUIRED USING (SELECT
              default::User
          FILTER
              (.id = <std::uuid>'e5e50a5a-f7c6-11ec-8f8e-0bf78a419551')
          );
      };
  };
  ALTER TYPE default::User {
      DROP LINK account;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK accounts := (.<owner[IS default::Account]);
  };
};
