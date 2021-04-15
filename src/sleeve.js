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

    const { chest, shoulderToElbow, shoulderToWrist, wrist } = measurements;
    const backArmhole = store.get("backArmhole");
    const frontArmhole = store.get("frontArmhole");
    const CM = 0.022 * (frontArmhole + backArmhole);
    const sleeveWidth = (frontArmhole + backArmhole) * 0.8;
    const fullWrist = wrist * 1.3;

    // SLEEVE GUIDEPOINTS
    points.origin = new Point(0, 0);

    points.j1 = points.origin.copy();
    points.j2 = points.j1.shift(RIGHT, sleeveWidth);
    points.k1 = points.j1.shift(RIGHT, 0.5 * sleeveWidth + 1 * CM);
    points.xLeft = points.k1.shift(LEFT, 4 * CM);
    points.xRight = points.k1.shift(RIGHT, 4 * CM);
    points.k2 = points.k1.shift(UP, 1.5 * CM);
    points.k = points.k1.shift(DOWN, 1.5 * CM);
    points.k3 = points.k.shift(DOWN, shoulderToElbow);
    points.p = points.k.shift(DOWN, shoulderToWrist);
    points.p1 = points.p.shift(LEFT, 0.5 * fullWrist)
    points.p2 = points.p.shift(RIGHT, 0.5 * fullWrist).shift(DOWN, CM);

    const sleeveCapHeight = 0.33 * sleeveWidth + 1 * CM
    points.j = points.j1.shift(DOWN, sleeveCapHeight);
    points.j3 = points.j2.shift(DOWN, sleeveCapHeight);

    const xAngle = points.j.angle(points.k);
    points.x1 = points.k.shiftFractionTowards(points.j, 0.5).shiftTowards(points.j, 1 * CM);
    points.x = points.x1.shiftFractionTowards(points.j, 0.5).shift(xAngle - 90, 1.6 * CM);

    const tAngle = points.j3.angle(points.k);
    points.t = points.k.shiftFractionTowards(points.j3, 0.5).shiftTowards(points.j3, 1 * CM).shift(tAngle - 90, 1.5 * CM)

    // Sleeve cap control points
    points.jCp = points.j.shift(RIGHT, 5 * CM);
    points.x1Cp1 = points.x1.shiftTowards(points.xLeft, -4 * CM);
    points.x1Cp2 = points.x1.shiftTowards(points.xLeft, 4 * CM);
    points.k2CpL = points.k2.shift(LEFT, 5 * CM);
    points.k2CpR = points.k2.shift(RIGHT, 5 * CM);
    points.j3Cp = points.j3.shiftTowards(points.k, 5 * CM)

    paths.sleeve = new Path()
        .move(points.j)
        .line(points.p1)
        .line(points.p2)
        .line(points.j3)
        .curve(points.j3Cp, points.k2CpR, points.k2)
        .curve(points.k2CpL, points.x1Cp2, points.x1)
        .curve(points.x1Cp1, points.jCp, points.j)

    let sleeveCapCirc = new Path()
        .move(points.j3)
        .curve(points.j3Cp, points.k2CpR, points.k2)
        .curve(points.k2CpL, points.x1Cp2, points.x1)
        .curve(points.x1Cp1, points.jCp, points.j)
        .length()


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