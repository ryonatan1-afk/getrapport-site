import {AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

export const OpenDraftScene = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const fadeIn = interpolate(frame, [0, 15], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const emailSlide = spring({frame: frame - 30, fps, config: {damping: 18, stiffness: 160}});
	const cursorBlink = Math.floor(frame / 20) % 2 === 0;
	const clickPulse = spring({frame: frame - 20, fps, config: {damping: 8, stiffness: 200}});
	const emailClientOpacity = interpolate(frame, [55, 85], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const emailClientY = interpolate(
		spring({frame: frame - 55, fps, config: {damping: 18, stiffness: 160}}),
		[0, 1], [30, 0]
	);
	const fadeOut = interpolate(frame, [295, 330], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

	return (
		<AbsoluteFill style={{background: '#f8fafc', opacity: fadeOut}}>
			<div style={{display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', gap: 48, padding: '0 80px', opacity: fadeIn}}>

				{/* Step 1: digest card with button being clicked */}
				<div style={{width: 300, flexShrink: 0}}>
					<div style={{fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12}}>
						Step 1 — Click "Open draft"
					</div>
					<div style={{
						background: 'white',
						border: '1.5px solid #e2e8f0',
						borderRadius: 14,
						padding: '18px',
						boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
					}}>
						<div style={{fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4}}>Priya Sharma</div>
						<div style={{fontSize: 12, color: '#0369a1', fontWeight: 600, marginBottom: 10}}>Diwali · Mon 28 Oct</div>
						<div style={{fontSize: 12, color: '#64748b', fontStyle: 'italic', lineHeight: 1.5, marginBottom: 14}}>
							"Hi Priya, I wanted to take a moment to wish you and your family a joyful and bright Diwali…"
						</div>
						<div style={{
							display: 'inline-flex',
							alignItems: 'center',
							gap: 6,
							fontSize: 12,
							fontWeight: 700,
							color: '#0369a1',
							background: `rgba(224,242,254,${interpolate(clickPulse, [0, 1], [0.5, 1])})`,
							border: '1.5px solid #bae6fd',
							padding: '7px 14px',
							borderRadius: 8,
							transform: `scale(${interpolate(clickPulse, [0, 0.5, 1], [1, 0.95, 1])})`,
							cursor: 'pointer',
						}}>
							✉ Open draft
						</div>
					</div>
				</div>

				{/* Arrow */}
				<div style={{
					fontSize: 28,
					color: '#0369a1',
					opacity: interpolate(frame, [60, 90], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
				}}>
					→
				</div>

				{/* Step 2: email client opens */}
				<div style={{
					flex: 1,
					opacity: emailClientOpacity,
					transform: `translateY(${emailClientY}px)`,
				}}>
					<div style={{fontSize: 11, fontWeight: 700, color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 12}}>
						Step 2 — Your email client opens
					</div>
					<div style={{
						background: 'white',
						border: '1.5px solid #e2e8f0',
						borderRadius: 14,
						boxShadow: '0 8px 40px rgba(0,0,0,0.10)',
						overflow: 'hidden',
					}}>
						{/* Email client chrome */}
						<div style={{background: '#f1f5f9', borderBottom: '1px solid #e2e8f0', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8}}>
							<div style={{fontSize: 12, color: '#64748b', fontWeight: 600}}>New Message</div>
						</div>
						<div style={{padding: 18}}>
							<div style={{borderBottom: '1px solid #f1f5f9', paddingBottom: 10, marginBottom: 10}}>
								<span style={{fontSize: 12, color: '#94a3b8', marginRight: 10}}>To:</span>
								<span style={{fontSize: 12, color: '#0f172a', fontWeight: 600}}>priya.sharma@company.com</span>
							</div>
							<div style={{borderBottom: '1px solid #f1f5f9', paddingBottom: 10, marginBottom: 14}}>
								<span style={{fontSize: 12, color: '#94a3b8', marginRight: 10}}>Subject:</span>
								<span style={{fontSize: 12, color: '#0f172a'}}>Wishing you a joyful Diwali 🪔</span>
							</div>
							<div style={{fontSize: 13, color: '#334155', lineHeight: 1.7}}>
								<p style={{margin: '0 0 10px'}}>Hi Priya,</p>
								<p style={{margin: '0 0 10px'}}>I wanted to take a moment to wish you and your family a joyful and bright Diwali. I hope the festival of lights brings warmth, happiness, and celebration into your home.</p>
								<p style={{margin: '0 0 10px'}}>Looking forward to catching up soon.</p>
								<p style={{margin: 0}}>Best,<br/>Alex</p>
							</div>
							<div style={{marginTop: 20, display: 'flex', alignItems: 'center', gap: 8}}>
								<div style={{
									background: '#0369a1',
									color: 'white',
									fontSize: 13,
									fontWeight: 700,
									padding: '9px 22px',
									borderRadius: 8,
									display: 'flex',
									alignItems: 'center',
									gap: 6,
								}}>
									Send ↑
								</div>
								<div style={{fontSize: 12, color: '#94a3b8'}}>Ready when you are.</div>
							</div>
						</div>
					</div>
					<div style={{
						fontSize: 12,
						color: '#16a34a',
						fontWeight: 600,
						marginTop: 12,
						display: 'flex',
						alignItems: 'center',
						gap: 6,
						opacity: interpolate(frame, [100, 130], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
					}}>
						<span style={{width: 18, height: 18, background: '#dcfce7', borderRadius: '50%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 10}}>✓</span>
						You review. You send. Rapport never sends on your behalf.
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
