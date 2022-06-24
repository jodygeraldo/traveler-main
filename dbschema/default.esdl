module default {

  type User {
    required property email -> str { constraint exclusive };
    required property createdAt -> datetime { default := datetime_current() };
    link password := .<user[is Password];
    multi link notes := .<user[is Note];
  }

  type Password {
    required property hash -> str;
    required link user -> User {
      constraint exclusive;  # one-to-one
      on target delete delete source;
    }
  }

  type Note {
    required property title -> str;
    required property body -> str;
    required property createdAt -> datetime { default := datetime_current() };
    required link user -> User {
      on target delete delete source;
    };
  }

  scalar type SiteStatus extending enum<Supported, Inactive, Pending, Reviewed>;
  scalar type SiteQuality extending enum<High, Low>;

  type Site {
    required property name -> str { constraint exclusive };
    required property url -> str { constraint exclusive };
    required property status -> SiteStatus { default := SiteStatus.Supported }
    required property quality -> SiteQuality { default := SiteQuality.High }
    property createdAt -> datetime { default := datetime_current() }

    multi link comics := .<sites[is Comic];
  }

  type Comic {
    required property title -> str { constraint exclusive };
    property originalTitle -> str { constraint exclusive };
    property aliases -> array<str>;

    required multi link sites -> Site;

    multi link chapters := .<comic[is Chapter];
  }

  type Chapter {
    required property title -> str;
    required property number -> float32;
    required property url -> str { constraint exclusive };
    required property createdAt -> datetime { default := datetime_current() };

    required link site -> Site { on target delete delete source };
    required link comic -> Comic { on target delete delete source };
  }
}
