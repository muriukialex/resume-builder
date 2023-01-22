interface SvgProps {
	width: string
	height: string
	stroke: string
	fill: string
}
const ToolTip = ({ width, height, stroke, fill }: SvgProps) => (
	<svg
		stroke={stroke}
		fill={fill}
		strokeWidth='0'
		viewBox='0 0 1024 1024'
		height={height}
		width={width}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z'></path>
		<path d='M464 336a48 48 0 1 0 96 0 48 48 0 1 0-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z'></path>
	</svg>
)

const AddIconCircle = ({ width, height, stroke, fill }: SvgProps) => (
	<svg
		stroke={stroke}
		fill={fill}
		strokeWidth='0'
		viewBox='0 0 512 512'
		height={height}
		width={width}
		xmlns='http://www.w3.org/2000/svg'
	>
		<path
			fill='none'
			strokeMiterlimit='10'
			strokeWidth='32'
			d='M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z'
		></path>
		<path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M256 176v160m80-80H176'></path>
	</svg>
)

export { ToolTip, AddIconCircle }
