CREATE MIGRATION m1nbxgnx7qggrdzbdabxlufkla2mu2sslgorf5clpomck5u5iuqtpq
    ONTO m1hwnngamv3ckcvehgvsmmbhalp6n6pdjrabouvzafna7l7huhelua
{
  ALTER TYPE default::UserCharacter {
      ALTER LINK characters {
          ALTER PROPERTY asecension {
              SET TYPE std::int64;
          };
      };
  };
  ALTER TYPE default::UserCharacter {
      ALTER LINK characters {
          ALTER PROPERTY elemental_burst {
              SET TYPE std::int64;
          };
      };
  };
  ALTER TYPE default::UserCharacter {
      ALTER LINK characters {
          ALTER PROPERTY elemental_skill {
              SET TYPE std::int64;
          };
      };
  };
  ALTER TYPE default::UserCharacter {
      ALTER LINK characters {
          ALTER PROPERTY level {
              SET TYPE std::int64;
          };
      };
  };
  ALTER TYPE default::UserCharacter {
      ALTER LINK characters {
          ALTER PROPERTY normal_attack {
              SET TYPE std::int64;
          };
      };
  };
};
