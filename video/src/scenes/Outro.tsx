import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

const stats = [
	{value: '14', unit: ' days', label: 'advance notice'},
	{value: '50', unit: '+', label: 'countries covered'},
	{value: '60', unit: 's', label: 'to action your digest'},
	{value: '0', unit: '', label: 'emails sent without you'},
];

export const Outro = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const headingOpacity = interpolate(frame, [0, 30], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const statsOpacity = interpolate(frame, [40, 70], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const ctaScale = spring({frame: frame - 90, fps, config: {damping: 14, stiffness: 120}});
	const ctaOpacity = interpolate(frame, [90, 120], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				padding: '0 80px',
			}}
		>
			<div style={{opacity: headingOpacity, textAlign: 'center', marginBottom: 48}}>
				<div style={{fontSize: 40, fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: 16}}>
					Stop missing the moments<br/>that matter.
				</div>
				<div style={{fontSize: 18, color: 'rgba(255,255,255,0.7)'}}>
					Your contacts are celebrating holidays every week.
				</div>
			</div>

			<div style={{opacity: statsOpacity, display: 'flex', gap: 40, marginBottom: 56}}>
				{stats.map((s) => (
					<div key={s.label} style={{textAlign: 'center'}}>
						<div style={{fontSize: 36, fontWeight: 800, color: 'white'}}>
							{s.value}<span style={{color: '#7dd3fc'}}>{s.unit}</span>
						</div>
						<div style={{fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 4}}>{s.label}</div>
					</div>
				))}
			</div>

			<div style={{
				opacity: ctaOpacity,
				transform: `scale(${ctaScale})`,
				textAlign: 'center',
			}}>
				<div style={{
					background: 'white',
					color: '#0369a1',
					fontSize: 18,
					fontWeight: 800,
					padding: '16px 48px',
					borderRadius: 14,
					display: 'inline-block',
					marginBottom: 16,
				}}>
					Free to start · Setup in 2 minutes
				</div>
				<div style={{fontSize: 16, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.02em'}}>
					getrapport.app
				</div>
			</div>
		</AbsoluteFill>
	);
};
