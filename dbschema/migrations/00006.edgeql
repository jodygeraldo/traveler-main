CREATE MIGRATION m1i5pd3li3ca7p3slz467ecg277zk56i4xqct7uuifrq6ujriolfqa
    ONTO m14ibl6yyv5aucsyplexzasbs4vnjq6ebt54tnqjkmapnkf6lrbpiq
{
  ALTER TYPE default::Inventory {
      ALTER LINK ascension_boss_material {
          ALTER PROPERTY quantity {
              SET TYPE std::int64;
          };
      };
      ALTER LINK ascension_gem {
          ALTER PROPERTY quantity {
              SET TYPE std::int64;
          };
      };
      ALTER LINK common_material {
          ALTER PROPERTY quantity {
              SET TYPE std::int64;
          };
      };
      ALTER LINK local_specialty {
          ALTER PROPERTY quantity {
              SET TYPE std::int64;
          };
      };
      ALTER LINK special_items {
          ALTER PROPERTY quantity {
              SET TYPE std::int64;
          };
      };
      ALTER LINK talent_book {
          ALTER PROPERTY quantity {
              SET TYPE std::int64;
          };
      };
      ALTER LINK talent_boss_material {
          ALTER PROPERTY quantity {
              SET TYPE std::int64;
          };
      };
  };
};
