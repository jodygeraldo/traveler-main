CREATE MIGRATION m14ibl6yyv5aucsyplexzasbs4vnjq6ebt54tnqjkmapnkf6lrbpiq
    ONTO m17j5slzvmgewumtrgjym7sfzyidcqkvqicykhufyeayqo5i67ohma
{
  ALTER TYPE default::UserCharacter {
      ALTER LINK characters {
          ALTER PROPERTY asecension {
              CREATE CONSTRAINT std::max_value(6);
              CREATE CONSTRAINT std::min_value(0);
          };
          ALTER PROPERTY elemental_burst {
              CREATE CONSTRAINT std::max_value(10);
              CREATE CONSTRAINT std::min_value(1);
          };
          ALTER PROPERTY elemental_skill {
              CREATE CONSTRAINT std::max_value(10);
              CREATE CONSTRAINT std::min_value(1);
          };
          ALTER PROPERTY level {
              CREATE CONSTRAINT std::max_value(90);
              CREATE CONSTRAINT std::min_value(1);
          };
          ALTER PROPERTY normal_attack {
              CREATE CONSTRAINT std::max_value(10);
              CREATE CONSTRAINT std::min_value(1);
          };
      };
  };
};
