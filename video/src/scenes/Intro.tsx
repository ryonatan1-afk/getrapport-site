import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const Intro = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const logoScale = spring({frame, fps, config: {damping: 14, stiffness: 120}});
	const textOpacity = interpolate(frame, [20, 50], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const subOpacity = interpolate(frame, [50, 90], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const fadeOut = interpolate(frame, [120, 150], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #0c4a6e 0%, #0369a1 60%, #0ea5e9 100%)',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				opacity: fadeOut,
			}}
		>
			<div style={{transform: `scale(${logoScale})`, marginBottom: 32}}>
				<svg width="80" height="80" viewBox="0 0 30 30" fill="none">
					<rect width="30" height="30" rx="8" fill="white" fillOpacity="0.15"/>
					<path d="M8 8h6.5a4.5 4.5 0 0 1 0 9H8V8z" fill="white"/>
					<path d="M14.5 17l5.5 5.5" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
				</svg>
			</div>
			<div style={{opacity: textOpacity, textAlign: 'center'}}>
				<div style={{fontSize: 52, fontWeight: 800, color: 'white', letterSpacing: '-1px', marginBottom: 16}}>
					Rapport
				</div>
				<div style={{fontSize: 22, color: 'rgba(255,255,255,0.8)', fontWeight: 400, maxWidth: 520, lineHeight: 1.4}}>
					Relationship intelligence for GTM teams
				</div>
			</div>
			<div style={{opacity: subOpacity, marginTop: 48, textAlign: 'center'}}>
				<div style={{
					fontSize: 18,
					color: 'rgba(255,255,255,0.6)',
					fontStyle: 'italic',
					letterSpacing: '0.01em',
				}}>
					"Never miss a warm moment with a contact again."
				</div>
			</div>
		</AbsoluteFill>
	);
};
