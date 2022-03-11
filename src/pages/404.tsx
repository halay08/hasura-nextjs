import {
  NextPage,
} from 'next';

/**
 * "404 not found" page, doesn't support i18n
 *
 * Doesn't use "getStaticPaths" because it's not supported by Next.js "getStaticPaths can only be used with dynamic pages, not '/404'."
 *
 * XXX The "locale" cannot be resolved properly using SSG on 404 pages, because this file doesn't belong to the "/[locale]" folder and thus doesn't benefit from url rewriting
 *  Therefore, the page will be displayed based on the DEFAULT_LOCALE value and not on the actual end-user locale
 *
 * @param props
 * @see https://nextjs.org/docs/advanced-features/custom-error-page#404-page
 */
const NotFound404Page: NextPage = (props): JSX.Element => {
  return (
    <div className="mt-5 p-5">
      <h1>Page not found</h1>
      <p>
        The page you're looking for doesn't exist
      </p>
    </div>
  );
};

export const NotFound404PageName = NotFound404Page.name;

export default NotFound404Page;
