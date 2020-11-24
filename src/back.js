import { LEFT, DOWN, RIGHT, UP, CM_FACTOR } from './constants';

export default function (part) {
  let {
    options,
    Point,
    Path,
    points,
    paths,
    Snippet,
    snippets,
    complete,
    sa,
    paperless,
    macro,
    measurements,
    store,
    utils
  } = part.shorthand()

  const { chest, shoulderSlope, waist } = measurements;
  const { chestEase, waistEase } = options;
  const chestEaseFactor = 1 + chestEase;
  const finalWaist = waist * (1 + waistEase);

  const CM = chest * CM_FACTOR;
  const HBW = chest / 20;
  points.nCp = points.centerBackNeck.shift(LEFT, HBW * 0.4);
  points.sCp = points.hpsBack.shift(DOWN + shoulderSlope, HBW * 0.4);

  const sideSeamAngle = 90 - points.sideBackWaist.angle(points.underArmSide);

  points.uCp = points.underArmSide.shift(RIGHT - sideSeamAngle, HBW * 1.2 * chestEaseFactor);
  points.tCp = points.shoulderBack.shift(DOWN + shoulderSlope, HBW * 1.2);

  // Back waist dart
  const backDartSize = points.sideBackWaist.dist(points.centerBackWaist) - store.get("finalBackWaist");

  points.e1 = points.centerBackWaist.shift(LEFT, finalWaist / 10);
  points.e2 = points.e1.shift(LEFT, backDartSize)
  points.eCenter = points.e1.shift(LEFT, backDartSize / 2);
  points.eTip = points.eCenter.shift(UP, points.centerBackWaist.dist(points.b) - 2 * CM);

  // Armhole dart
  points.s2 = points.hpsBack.shiftFractionTowards(points.shoulderBack, 0.33)
  points.s5 = points.s2.shift(DOWN, 9 * CM);
  points.qCenter = utils.curveIntersectsY(points.underArmSide, points.uCp, points.tCp, points.shoulderBack, points.s5.y);

  points.q1 = points.qCenter.shift(UP, 0.65 * CM)
  points.q2 = points.qCenter.shift(DOWN, 0.65 * CM)


  paths.backBase = new Path()
    .move(points.hpsBack)
    .curve(points.sCp, points.nCp, points.centerBackNeck)
    .line(points.centerBackWaist)
    .line(points.e1)
    .line(points.eTip)
    .line(points.e2)
    .line(points.sideBackWaist)
    .line(points.underArmSide)
    .curve_(points.uCp, points.q2)
    .line(points.s5)
    .line(points.q1)
    ._curve(points.tCp, points.shoulderBack)
    .close()

  // Complete?
  if (complete) {
    if (sa) {
    }
  }

  // Paperless?
  if (paperless) {

  }

  return part
}
