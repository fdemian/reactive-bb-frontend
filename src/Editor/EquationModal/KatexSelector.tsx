import PropTypes from 'prop-types';
import { Input, Tabs, Tooltip } from 'antd';
import KatexRenderer from './KatexRenderer';
import './EquationModal.css';

interface KatexSelectorProps {
  equation: string;
  setEquation: (p: string) => void;
  t: (key: string) => string;
}

const KatexSelector = ({ equation, setEquation, t }: KatexSelectorProps) => {
  const POPULAR_INPUTS = [
    { text: t('equationModal.fraction'), equation: '\\frac{a}{b}' },
    { text: t('equationModal.power'), equation: 'a^b' },
    { text: t('equationModal.sqrt'), equation: '\\sqrt{a}' },
    { text: t('equationModal.qrt'), equation: '\\sqrt[3]{x}' },
    { text: t('equationModal.nrth'), equation: '\\sqrt[n]{x}' },
    { text: t('equationModal.derivative'), equation: "f'(x)" },
    { text: t('equationModal.nthOrderDerivative'), equation: 'f^{(k)}(x)' },
    {
      text: t('equationModal.partialDerivative'),
      equation: '\\frac{\\partial f}{\\partial x}',
    },
    { text: t('equationModal.integral'), equation: '\\int f(x)' },
    {
      text: t('equationModal.doubleIntegral'),
      equation: '\\iint_{r} f(x,y)',
    },
    {
      text: t('equationModal.definiteIntegral'),
      equation: '\\int_{a}^b f(x)dx',
    },
    {
      text: t('equationModal.summation'),
      equation: '\\sum_{k=1}^n \\alpha_k',
    },
    { text: t('equationModal.limit'), equation: '\\lim_{x \\to a} f(x)' },
    { text: t('equationModal.vector'), equation: '\\vec{x}' },
    {
      text: `(1X3) ${t('equationModal.rowVector')}`,
      equation: '\\begin{pmatrix}a & b & c\\end{pmatrix} ',
    },
    {
      text: `(2x2) ${t('equationModal.matrix')}`,
      equation: '\\begin{pmatrix}a & b\\\\ c & d\\end{pmatrix}',
    },
  ];

  const CALCULUS_SUMS = [
    { text: t('equationModal.firtOrderDerivative'), equation: "f'(x)" },
    { text: t('equationModal.secondOrderDerivative'), equation: "f''(x)" },
    { text: t('equationModal.nthOrderDerivative'), equation: 'f^{(k)}(x)' },
    {
      text: t('equationModal.partialDerivative'),
      equation: '\\frac{\\partial f}{\\partial x}',
    },
    {
      text: t('equationModal.partialSecondDerivative'),
      equation: '\\frac{\\partial^2 f}{\\partial x^2}',
    },
    {
      text: t('equationModal.partialNthDerivative'),
      equation: '\\frac{\\partial^{k} f}{\\partial x^k}',
    },
    { text: t('equationModal.integral'), equation: '\\int f(x)' },
    {
      text: t('equationModal.doubleIntegral'),
      equation: '\\iint_{r} f(x,y)',
    },
    {
      text: t('equationModal.tripleIntegral'),
      equation: '\\iiint_{r} f(x,y,z)',
    },
    {
      text: t('equationModal.definiteIntegral'),
      equation: '\\int_{a}^b f(x)dx',
    },
    {
      text: t('equationModal.summation'),
      equation: '\\sum_{k=1}^n \\alpha_k',
    },
    { text: t('equationModal.limit'), equation: '\\lim_{x \\to a} f(x)' },
    {
      text: t('equationModal.2dLimit'),
      equation: '\\lim_{(x,y) \\to (a,b)} f(x)',
    },
    {
      text: t('equationModal.3dLimit'),
      equation: '\\lim_{(x,y,z) \\to (a,b,c)} f(x)',
    },
    {
      text: t('equationModal.product'),
      equation: '\\prod\\limits_{j=1}^k A_{\\alpha_j}',
    },
    {
      text: t('equationModal.piecewiseFunction'),
      equation:
        'f(x) = \\begin{cases} a &\\text{if } b \\newline c &\\text{if } d\\end{cases}',
    },
  ];

  const CALCULUS_SYMBOLS = [
    { text: t('equationModal.pi'), equation: '\\pi' },
    { text: t('equationModal.infty'), equation: '\\infty' },
    { text: t('equationModal.euler'), equation: 'e' },
    { text: t('equationModal.imaginaryConst'), equation: 'i' },
    { text: 'Alpha', equation: '\\alpha' },
    { text: 'Beta', equation: '\\beta' },
    { text: 'Gamma', equation: '\\gamma' },
    { text: 'Dela', equation: '\\delta' },
    { text: 'Epsilon', equation: '\\epsilon' },
    { text: 'Zeta', equation: '\\zeta' },
    { text: 'Eta', equation: '\\eta' },
    { text: 'Kappa', equation: '\\kappa' },
    { text: 'Lambda', equation: '\\lambda' },
    { text: 'Mu', equation: '\\mu' },
    { text: 'Nu', equation: '\\nu' },
    { text: 'Xi', equation: '\\xi' },
    { text: 'Rho', equation: '\\rho' },
    { text: 'Sigma', equation: '\\sigma' },
    { text: 'Tau', equation: '\\tau' },
    { text: 'Phi', equation: '\\phi' },
    { text: 'Chi', equation: '\\chi' },
    { text: 'Psi', equation: '\\psi' },
    { text: 'Omega', equation: '\\omega' },
    { text: 'Aleph', equation: '\\aleph' },
    { text: 'H-Bar', equation: '\\hbar' },
    { text: t('equationModal.equal'), equation: '=' },
    { text: t('equationModal.notEqual'), equation: '\\neq' },
    { text: t('equationModal.greaterThan'), equation: '\\gt' },
    { text: t('equationModal.lessThan'), equation: '\\lt' },
    { text: t('equationModal.greaterEqual'), equation: '\\geq' },
    { text: t('equationModal.lessEqual'), equation: '\\leq' },
  ];

  const predefinedInputs = [
    {
      key: '1',
      inputs: POPULAR_INPUTS,
      title: t('equationModal.popularInputs'),
    },
    {
      key: '2',
      inputs: CALCULUS_SUMS,
      title: t('equationModal.calculusSums'),
    },
    {
      key: '3',
      inputs: CALCULUS_SYMBOLS,
      title: t('equationModal.symbols'),
    },
  ];

  const tabItems = predefinedInputs.map((i) => ({
    label: i.title,
    key: i.key,
    children: i.inputs.map((i) => (
      <>
        <Tooltip title={i.text}>
          <button
            aria-label={i.equation}
            className="equation-modal-button"
            onClick={() => { setEquation(i.equation); }}
          >
            <KatexRenderer
              equation={i.equation}
              inline={true}
              onClick={() => {}}
            />
          </button>
        </Tooltip>
      </>
    )),
  }));

  return (
    <>
      <Tabs defaultActiveKey="1" onChange={undefined} items={tabItems} />
      <br />
      <br />
      <Input
        role="textbox"
        aria-label="Equation input"
        style={{ width: '200px' }}
        value={equation}
        onChange={(e) => { setEquation(e.target.value); }}
      />
    </>
  );
};

KatexSelector.propTypes = {
  equation: PropTypes.string.isRequired,
  setEquation: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default KatexSelector;
