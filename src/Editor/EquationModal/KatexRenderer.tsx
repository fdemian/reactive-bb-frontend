/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

// $FlowFixMe
import katex from 'katex';
import { useEffect, useRef } from 'react';
import 'katex/dist/katex.css';
import './Katex.css'
interface KatexRendererProps {
  equation: string;
  inline: boolean;
}

const KatexRenderer = ({ equation, inline }: KatexRendererProps) => {
  const katexElementRef = useRef(null);

  useEffect(() => {
    const katexElement = katexElementRef.current;

    /* eslint-disable  @typescript-eslint/no-unnecessary-condition */
    if (katexElement !== null) {
      katex.render(equation, katexElement, {
        displayMode: !inline, // true === block display //
        errorColor: '#cc0000',
        output: 'html',
        strict: 'warn',
        throwOnError: false,
        trust: false,
      });
    }
  }, [equation, inline]);

  return (
    <span role="button" className="katex-display-btn" tabIndex={-1} ref={katexElementRef} />
  );
};

export default KatexRenderer;
