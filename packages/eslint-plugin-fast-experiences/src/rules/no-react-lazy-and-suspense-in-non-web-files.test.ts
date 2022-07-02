/**
 * @fileoverview Checks if the platform specificity of a file name is provided correctly.
 * @author Mark Polak
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

import rule from "./no-react-lazy-and-suspense-in-non-web-files";
import { ESLintUtils } from "@typescript-eslint/utils";

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new ESLintUtils.RuleTester({
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
});
ruleTester.run("no-react-lazy-and-suspense-in-non-web-files", rule, {
  valid: [
    {
      filename: "index.tsx",
      code: `
      import { Suspense } from "SomeNonReactPackage";
      // Using Suspense component imported from other package than react shouldn't violate rule
      const TestComponent = () => (
          <Suspense fallback={null}>
              <LazyLoadedComponent />
          </Suspense>
      );
      // Using non-react lazy function in non-web file shouldn't violate rule
      const lazy = () => {};
      const LazyLoadedComponent = lazy();
      `,
    },
    {
      filename: "index.web.tsx",
      code: `
        import { Suspense } from "react";
        // Using Suspense component imported from other package than react shouldn't violate rule
        const TestComponent = () => (
            <Suspense fallback={null}>
                <LazyLoadedComponent />
            </Suspense>
        );
        // Using non-react lazy function in non-web file shouldn't violate rule
        const lazy = () => {};
        const LazyLoadedComponent = lazy();
        `,
    },

    {
      filename: "index.web.tsx",
      code: `
          import { Suspense } from "suspense-component";
          // Using Suspense component imported from other package than react shouldn't violate rule
          const TestComponent = () => (
              <Suspense fallback={null}>
                  <LazyLoadedComponent />
              </Suspense>
          );
          // Using non-react lazy function in non-web file shouldn't violate rule
          const lazy = () => {};
          const LazyLoadedComponent = lazy();
          `,
    },

    {
      filename: "index.web.ts",
      code: `
            import { Suspense } from "react";
            const lazy = () => {};
            const LazyLoadedComponent = lazy();
            `,
    },
  ],

  invalid: [
    {
      filename: "index.tsx",
      code: `import { lazy, Suspense } from "react";

      const LazyLoadedComponent = lazy(() => import("./SomeComponent"));

      const TestComponent = () => (
        <Suspense fallback={null}>
          <LazyLoadedComponent />
        </Suspense>
      );`,
      errors: [
        {
          messageId: "lazy",
          line: 3,
        },
        {
          messageId: "suspense",
          line: 6,
        },
      ],
    },
    {
      filename: "index.tsx",
      code: `import * as React from "react";
        
        const TestComponent = () => (
          <React.Suspense fallback={null}>
            <LazyLoadedComponent />
          </React.Suspense>
        );`,
      errors: [
        {
          messageId: "suspense",
          line: 4,
        },
      ],
    },
    {
      filename: "index.tsx",
      code: `import * as React from "react";

        const LazyLoadedComponent = React.lazy(() => import("./SomeComponent"));
        
        const TestComponent = () => (
          <React.Suspense fallback={null}>
            <LazyLoadedComponent />
          </React.Suspense>
        );`,
      errors: [
        {
          messageId: "lazy",
          line: 3,
        },
        {
          messageId: "suspense",
          line: 6,
        },
      ],
    },

    {
      filename: "index.tsx",
      code: `import React, { something } from "react";

        const LazyLoadedComponent = React.lazy(() => import("./SomeComponent"));
        
        const TestComponent = () => (
            <React.Suspense fallback={null}>
                <LazyLoadedComponent />
            </React.Suspense>
        );`,
      errors: [
        {
          messageId: "lazy",
          line: 3,
        },
        {
          messageId: "suspense",
          line: 6,
        },
      ],
    },

    {
      filename: "index.android.ts",
      code: `import * as React from "react";
        import { lazy } from "react";
        
        const LazyLoadedComponent = React.lazy(() => import("./SomeComponent"));
        
        const LazyLoadedComponent = lazy(() => import("./SomeComponent"));
      `,
      errors: [
        {
          messageId: "lazy",
          line: 4,
        },
        {
          messageId: "lazy",
          line: 6,
        },
      ],
    },

    {
      filename: "index.android.tsx",
      code: `import * as React from "react";
        import { Suspense } from "react";
        
        const LazyLoadedComponent = React.lazy(() => import("./SomeComponent"));
        
        const TestComponent = () => (
          <>
            <React.Suspense fallback={null}>
              <LazyLoadedComponent />
            </React.Suspense>
            <Suspense fallback={null}>
              <LazyLoadedComponent />
            </Suspense>
          </>
        ); `,
      errors: [
        {
          messageId: "lazy",
          line: 4,
        },
        {
          messageId: "suspense",
          line: 8,
        },
        {
          messageId: "suspense",
          line: 11,
        },
      ],
    },
  ],
});
