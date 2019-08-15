import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { BookCoverEditor } from '../src/components/BookCoverEditor';
import { BookData, RightsStatusData } from "../src/interfaces";

const resolvePromise = new Promise<void>(resolve => resolve());
let rightsStatuses: RightsStatusData = {
  "http://creativecommons.org/licenses/by/4.0/": {
    "allows_derivatives": true,
    "name": "Creative Commons Attribution (CC BY)",
    "open_access": true
  },
  "http://librarysimplified.org/terms/rights-status/in-copyright": {
    "allows_derivatives": false,
    "name": "In Copyright",
    "open_access": false
  },
  "https://creativecommons.org/licenses/by-nd/4.0": {
    "allows_derivatives": false,
    "name": "Creative Commons Attribution-NoDerivs (CC BY-ND)",
    "open_access": true
  }
};

let bookData: BookData = {
  id: "id",
  title: "title",
  coverUrl: "/cover",
  changeCoverLink: {
    href: "/change_cover",
    rel: "http://librarysimplified.org/terms/rel/change_cover"
  }
};

storiesOf('circulation-web/BookCoverEditor', module)
  .add('example',
    () => (
      <BookCoverEditor
        bookAdminUrl="/admin/book"
        rightsStatuses={rightsStatuses}
        bookUrl="/book"
        book={bookData}
        refreshCatalog={() => resolvePromise}
        csrfToken="token"
      />),
    {
      notes: "The form component to add/update a book's cover image and its rights."
    }
  );