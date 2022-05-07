import { ElementNode } from 'svg-parser'

interface BadgeNode extends ElementNode {
    rectFill?: string
}

/**
 * Process badge icon background shape fill and omit it from node
 */
export function badger(node: ElementNode, fileName: string) {
    const nodeClone: BadgeNode = { ...node }
    const svgChildren = node.children as ElementNode[]

    const children = svgChildren.reduce(
        (accumulator: ElementNode[], child: ElementNode, index: number) => {
            const childClone = { ...child }

            const isValidBackgroundShapeElement =
                fileName.includes('Badge') &&
                index === 0 &&
                childClone.tagName === 'rect' &&
                childClone.properties?.fill

            if (isValidBackgroundShapeElement) {
                nodeClone.rectFill = String(childClone.properties!.fill)
                return [...accumulator]
            }

            return [...accumulator, childClone]
        },
        []
    )

    return {
        ...nodeClone,
        children,
    } as BadgeNode
}
