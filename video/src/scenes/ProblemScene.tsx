import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const problems = [
	{icon: '📅', title: 'You forgot it was coming', body: "A contact's Diwali passed two weeks ago.\nThey never heard from you."},
	{icon: '🌍', title: "You didn't know which holiday applies", body: 'Your contact in Mumbai celebrates different\nholidays than the one in Lagos.'},
	{icon: '✏️', title: "You didn't know what to write", body: 'You stared at a blank draft for five minutes.\nThen moved on. The moment passed.'},
];

const ProblemCard = ({icon, title, body, delay}: {icon: string; title: string; body: string; delay: number}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const cardY = spring({frame: frame - delay, fps, config: {damping: 18, stiffness: 160}});
	const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<div style={{
			opacity,
			transform: `translateY(${interpolate(cardY, [0, 1], [40, 0])}px)`,
			background: 'white',
			border: '1.5px solid #e2e8f0',
			borderRadius: 16,
			padding: '24px 28px',
			flex: 1,
		}}>
			<div style={{fontSize: 32, marginBottom: 12}}>{icon}</div>
			<div style={{fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8}}>{title}</div>
			<div style={{fontSize: 13, color: '#64748b', lineHeight: 1.6, whiteSpace: 'pre-line'}}>{body}</div>
		</div>
	);
};

export const ProblemScene = () => {
	const frame = useCurrentFrame();
	const headingOpacity = interpolate(frame, [0, 12], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [95, 120], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: '#f8fafc', padding: '64px 80px', opacity: fadeOut}}>
			<div style={{opacity: headingOpacity, marginBottom: 40, textAlign: 'center'}}>
				<div style={{fontSize: 13, fontWeight: 700, color: '#0369a1', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14}}>
					The problem
				</div>
				<div style={{fontSize: 34, fontWeight: 800, color: '#0f172a', lineHeight: 1.15}}>
					You know you should reach out.<br/>
					<span style={{color: '#64748b', fontWeight: 600}}>Something always gets in the way.</span>
				</div>
			</div>
			<div style={{display: 'flex', gap: 20, flex: 1}}>
				{problems.map((p, i) => (
					<ProblemCard key={p.title} {...p} delay={10 + i * 15} />
				))}
			</div>
		</AbsoluteFill>
	);
};
