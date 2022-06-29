CREATE MIGRATION m1ozet4mn4aenoaisgqdu35ly7nq726j7apw3ph4rdnhd6hlk67znq
    ONTO m1nbxgnx7qggrdzbdabxlufkla2mu2sslgorf5clpomck5u5iuqtpq
{
  ALTER TYPE default::UserCharacter {
      ALTER LINK characters {
          DROP PROPERTY tracked;
      };
  };
};
