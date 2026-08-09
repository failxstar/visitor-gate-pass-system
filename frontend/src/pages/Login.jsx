import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, ChevronDown } from 'lucide-react';
import useAuth from '../context/useAuth';


const ROLE_CREDENTIALS = {
  ADMIN:  { email: 'admin@college.edu',  label: 'Administrator' },
  GUARD:  { email: 'guard@college.edu',  label: 'Security Guard' },
  HOST:   { email: 'host@college.edu',   label: 'Host / Faculty' },
};

const Login = () => {
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [role, setRole]                 = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleChange = (e) => {
    const selected = e.target.value;
    setRole(selected);
    if (selected && ROLE_CREDENTIALS[selected]) {
      setEmail(ROLE_CREDENTIALS[selected].email);
    } else {
      setEmail('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!role) { setError('Please select your role.'); return; }
    setLoading(true);
    setError('');
    try {
      const returnedRole = await login(email, password);
      if (returnedRole === 'ADMIN') navigate('/admin');
      else if (returnedRole === 'GUARD') navigate('/guard');
      else if (returnedRole === 'HOST') navigate('/host');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ─── styles ─────────────────────────────────────────────── */
  const input = {
    width: '100%', padding: '0.8rem 1rem',
    background: 'rgba(255,255,255,0.13)',
    border: '1px solid rgba(255,255,255,0.28)',
    borderRadius: '12px', color: 'white',
    fontSize: '0.95rem', outline: 'none',
    boxSizing: 'border-box', transition: 'border 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(140deg, #4f46e5 0%, #7c3aed 45%, #9333ea 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem', fontFamily: "'Inter', 'Segoe UI', sans-serif",
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative blobs */}
      <div style={{ position:'fixed', top:'-15%', right:'-10%', width:'420px', height:'420px',
        borderRadius:'50%', background:'rgba(255,255,255,0.06)', filter:'blur(80px)', zIndex:0 }} />
      <div style={{ position:'fixed', bottom:'-15%', left:'-10%', width:'420px', height:'420px',
        borderRadius:'50%', background:'rgba(255,255,255,0.06)', filter:'blur(80px)', zIndex:0 }} />
      <div style={{ position:'fixed', top:'40%', left:'30%', width:'200px', height:'200px',
        borderRadius:'50%', background:'rgba(167,139,250,0.15)', filter:'blur(60px)', zIndex:0 }} />

            {/* Card */}
      <div style={{
        position:'relative', zIndex:1,
        width:'100%', maxWidth:'480px', /* <-- INCREASE THIS VALUE (e.g., 480px, 500px) */
        background:'rgba(255,255,255,0.13)',
        backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
        borderRadius:'28px',
        border:'1px solid rgba(255,255,255,0.28)',
        padding:'2.25rem 2rem',
        boxShadow:'0 32px 64px rgba(0,0,0,0.35)',
      }}>


        {/* ── Logo ── */}
        <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'1.5rem' }}>
          <div style={{
            width:'80px', height:'80px', borderRadius:'50%',
            background:'rgba(255,255,255,0.18)',
            border:'2px solid rgba(255,255,255,0.35)',
            display:'flex', alignItems:'center', justifyContent:'center',
            marginBottom:'1rem',
            boxShadow:'0 8px 32px rgba(0,0,0,0.25)',
            overflow:'hidden',
          }}>
            <img
              src="/college-logo.png"
              alt="College Logo"
              style={{ width:'64px', height:'64px', objectFit:'contain', borderRadius:'50%' }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML = '<span style="font-size:2.2rem">🛡️</span>';
              }}
            />
          </div>

          <h1 style={{
            color:'white', fontSize:'2rem', fontWeight:'800',
            margin:0, letterSpacing:'-0.03em', textAlign:'center',
          }}>
            Welcome Back
          </h1>
          <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.83rem', marginTop:'0.4rem', textAlign:'center' }}>
            Visitor Entry &amp; Gate Pass System
          </p>
        </div>

        {/* ── Error ── */}
        {error && (
          <div style={{
            background:'rgba(239,68,68,0.2)', border:'1px solid rgba(239,68,68,0.45)',
            color:'#fecaca', padding:'0.7rem 1rem', borderRadius:'10px',
            fontSize:'0.85rem', marginBottom:'1.1rem',
          }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:'1.1rem' }}>

          {/* ── Role Dropdown ── */}
          <div>
            <label style={{ display:'block', color:'rgba(255,255,255,0.88)', fontSize:'0.83rem', fontWeight:'600', marginBottom:'0.45rem', letterSpacing:'0.02em' }}>
              SELECT ROLE
            </label>
            <div style={{ position:'relative' }}>
              <select
                value={role}
                onChange={handleRoleChange}
                required
                style={{
                  ...input,
                  appearance:'none', WebkitAppearance:'none',
                  cursor:'pointer', paddingRight:'2.5rem',
                  color: role ? 'white' : 'rgba(255,255,255,0.45)',
                }}
              >
                <option value="" disabled style={{ background:'#4f46e5', color:'rgba(255,255,255,0.5)' }}>
                  Choose your role...
                </option>
                <option value="ADMIN" style={{ background:'#4f46e5', color:'white' }}>🔐 Administrator</option>
                <option value="GUARD" style={{ background:'#4f46e5', color:'white' }}>👮 Security Guard</option>
                <option value="HOST"  style={{ background:'#4f46e5', color:'white' }}>🎓 Host / Faculty</option>
              </select>
              <ChevronDown size={18} color="rgba(255,255,255,0.6)" style={{ position:'absolute', right:'0.85rem', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} />
            </div>
          </div>

          {/* ── Email ── */}
          <div>
            <label style={{ display:'block', color:'rgba(255,255,255,0.88)', fontSize:'0.83rem', fontWeight:'600', marginBottom:'0.45rem', letterSpacing:'0.02em' }}>
              EMAIL ADDRESS
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              style={input}
              onFocus={e => e.target.style.border = '1px solid rgba(255,255,255,0.7)'}
              onBlur={e  => e.target.style.border = '1px solid rgba(255,255,255,0.28)'}
            />
          </div>

          {/* ── Password ── */}
          <div>
            <label style={{ display:'block', color:'rgba(255,255,255,0.88)', fontSize:'0.83rem', fontWeight:'600', marginBottom:'0.45rem', letterSpacing:'0.02em' }}>
              PASSWORD
            </label>
            <div style={{ position:'relative' }}>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{ ...input, paddingRight:'3rem' }}
                onFocus={e => e.target.style.border = '1px solid rgba(255,255,255,0.7)'}
                onBlur={e  => e.target.style.border = '1px solid rgba(255,255,255,0.28)'}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position:'absolute', right:'0.85rem', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'rgba(255,255,255,0.65)', display:'flex', alignItems:'center' }}>
                {showPassword ? <EyeOff size={19}/> : <Eye size={19}/>}
              </button>
            </div>
          </div>

          {/* ── Remember + Forgot ── */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
            <label style={{ display:'flex', alignItems:'center', gap:'0.45rem', cursor:'pointer', color:'rgba(255,255,255,0.78)', fontSize:'0.85rem' }}>
              <input type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.target.checked)}
                style={{ width:'16px', height:'16px', accentColor:'#a78bfa', cursor:'pointer' }}/>
              Remember me
            </label>
            <a href="#" style={{ color:'rgba(255,255,255,0.78)', fontSize:'0.85rem', textDecoration:'none' }}
              onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.78)'}>
              Forgot Password?
            </a>
          </div>

          {/* ── Sign In Button ── */}
          <button type="submit" disabled={loading}
            style={{
              width:'100%', padding:'0.9rem',
              background: loading
                ? 'rgba(255,255,255,0.5)'
                : 'linear-gradient(135deg, #f59e0b 0%, #ef4444 50%, #ec4899 100%)',
              color:'white', fontWeight:'800', fontSize:'1rem',
              border:'none', borderRadius:'12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
              boxShadow: loading ? 'none' : '0 8px 24px rgba(239,68,68,0.35)',
              transition:'all 0.25s', letterSpacing:'0.03em',
              marginTop:'0.2rem',
            }}
            onMouseEnter={e => { if(!loading){ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(239,68,68,0.5)'; }}}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(239,68,68,0.35)'; }}
          >
            {loading
              ? <><Loader2 size={20} style={{ animation:'spin 1s linear infinite' }}/> Signing In...</>
              : '🔓 Sign In'}
          </button>
          
          {/* ── Request Visitor Pass Button ── */}
          <button type="button" onClick={() => navigate('/visitor-request')}
            style={{
              width:'100%', padding:'0.9rem',
              background: 'rgba(255, 255, 255, 0.1)',
              color:'white', fontWeight:'700', fontSize:'0.95rem',
              border:'1px solid rgba(255, 255, 255, 0.2)', borderRadius:'12px',
              cursor: 'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
              transition:'all 0.25s', letterSpacing:'0.03em',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.background='rgba(255, 255, 255, 0.15)'; e.currentTarget.style.border='1px solid rgba(255, 255, 255, 0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.background='rgba(255, 255, 255, 0.1)'; e.currentTarget.style.border='1px solid rgba(255, 255, 255, 0.2)'; }}
          >
            📋 Request Visitor Pass
          </button>
        </form>

        {/* ── Footer hint ── */}
        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.42)', fontSize:'0.73rem', marginTop:'1.4rem', lineHeight:'1.6' }}>
          Secured with JWT Authentication · Role-Based Access
        </p>
      </div>

      <style>{`
        input::placeholder, select option[disabled] { color: rgba(255,255,255,0.42); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        select option { background: #3730a3; }
      `}</style>
    </div>
  );
};

export default Login;
