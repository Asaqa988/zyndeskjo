import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { inView } from '../components/ui.jsx'

export default function InsightPost({ t }) {
  const { slug } = useParams()
  const post = t.posts.find((p) => p.slug === slug)
  if (!post) return <Navigate to="/insights" replace />

  return (
    <main className="page">
      <section className="section" style={{ borderTop: 'none' }}>
        <div className="container container-narrow">
          <Link to="/insights" className="post-back">{t.back}</Link>
          <div className="insight-meta post-meta">
            <span className="insight-tag">{post.tag}</span>
            <span>{post.date} · {post.read}</span>
          </div>
          <motion.h1 className="display post-title" {...inView}>{post.title}</motion.h1>
          <div className="post-body">
            {post.body.map((para, i) => (
              <motion.p key={i} {...inView} transition={{ ...inView.transition, delay: i * 0.05 }}>{para}</motion.p>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
