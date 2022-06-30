CREATE MIGRATION m13g4z2ezu6knybzp527xmwbpmxltr4uc7qy2o6s3nm3og26ofmkeq
    ONTO m1gi5kquczgrmh6ol62utx3t3elj5wahsn5xpdszh627azcp5zvh2a
{
  ALTER TYPE default::Account {
      CREATE LINK owner := (.<account[IS default::User]);
  };
};
