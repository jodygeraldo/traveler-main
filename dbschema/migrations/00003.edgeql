CREATE MIGRATION m177b2iof2u3pbejawcdazbwiavqbwav2ysfqherd4htgklppmrrga
    ONTO m1kt42vjynoq2uik53rdzfjp2ecbr2upzqhpdvfzyml5xztdzkwnla
{
  CREATE TYPE default::Chapter {
      CREATE REQUIRED PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY number -> std::float32;
      CREATE REQUIRED PROPERTY title -> std::str;
      CREATE REQUIRED PROPERTY url -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  CREATE TYPE default::Comic {
      CREATE PROPERTY aliases -> array<std::str>;
      CREATE PROPERTY originalTitle -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY title -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Chapter {
      CREATE REQUIRED LINK comic -> default::Comic {
          ON TARGET DELETE  DELETE SOURCE;
      };
  };
  ALTER TYPE default::Comic {
      CREATE MULTI LINK chapters := (.<comic[IS default::Chapter]);
  };
  CREATE SCALAR TYPE default::SiteQuality EXTENDING enum<High, Low>;
  CREATE SCALAR TYPE default::SiteStatus EXTENDING enum<Supported, Inactive, Pending, Reviewed>;
  CREATE TYPE default::Site {
      CREATE PROPERTY createdAt -> std::datetime {
          SET default := (std::datetime_current());
      };
      CREATE REQUIRED PROPERTY name -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY quality -> default::SiteQuality {
          SET default := (default::SiteQuality.High);
      };
      CREATE REQUIRED PROPERTY status -> default::SiteStatus {
          SET default := (default::SiteStatus.Supported);
      };
      CREATE REQUIRED PROPERTY url -> std::str {
          CREATE CONSTRAINT std::exclusive;
      };
  };
  ALTER TYPE default::Chapter {
      CREATE REQUIRED LINK site -> default::Site {
          ON TARGET DELETE  DELETE SOURCE;
      };
  };
  ALTER TYPE default::Comic {
      CREATE REQUIRED MULTI LINK sites -> default::Site;
  };
  ALTER TYPE default::Site {
      CREATE MULTI LINK comics := (.<sites[IS default::Comic]);
  };
};
