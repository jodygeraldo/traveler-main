CREATE MIGRATION m163y2hpg6o6oq4v7f6g6y3ggny227x3gpvkl3nls7oxb4tr6j7uta
    ONTO m1bcnmxshf3ogrjnrstxdldi5y3mlhy2ctfsin4ucfgodufvyspgfq
{
  ALTER TYPE default::UserCharacter {
      ALTER LINK characters {
          ALTER PROPERTY asecension {
              RENAME TO ascension;
          };
      };
  };
};
