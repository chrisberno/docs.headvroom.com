---
sidebar_label: Welcome
sidebar_position: 0
slug: /
title: "Headvroom Documentation"
hide_table_of_contents: true
---

<img src="img/headvroom-logo-light.png" width="200" alt="Headvroom" />

**Interactive knowledge graph visualization.** Think TheBrain, but modern.

Headvroom is a visual tool for organizing your knowledge as an interactive graph. Create nodes, connect them, and explore relationships between your ideas, resources, and projects.

---

## Welcome! How Can We Help You Today?

Find your documentation path based on how you interact with Headvroom:

<div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '30px', marginBottom: '30px'}}>

  {/* Users Card */}
  <div style={{
    border: '2px solid #06B6D4',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: '#0E2A32',
    boxShadow: '0 2px 8px rgba(6, 182, 212, 0.2)'
  }}>
    <h3 style={{color: '#22D3EE', marginTop: 0}}>👤 I'm a User</h3>
    <p style={{fontSize: '14px', color: '#94A3B8', minHeight: '60px'}}>
      I use Headvroom to organize my knowledge, ideas, and resources
    </p>
    <div style={{borderTop: '1px solid #164E63', paddingTop: '16px', marginTop: '16px'}}>
      <a href="/users" style={{
        display: 'block',
        padding: '12px 20px',
        backgroundColor: '#06B6D4',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '12px'
      }}>
        Users Guide
      </a>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
        <a href="/getting-started" style={{
          display: 'block',
          padding: '8px',
          backgroundColor: '#0891B2',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          Quick Start
        </a>
        <a href="/features/nodes-connections" style={{
          display: 'block',
          padding: '8px',
          backgroundColor: '#0891B2',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          Features
        </a>
      </div>
    </div>
  </div>

  {/* Developers Card */}
  <div style={{
    border: '2px solid #8B5CF6',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: '#1E1B2E',
    boxShadow: '0 2px 8px rgba(139, 92, 246, 0.2)'
  }}>
    <h3 style={{color: '#A78BFA', marginTop: 0}}>💻 I'm a Developer</h3>
    <p style={{fontSize: '14px', color: '#94A3B8', minHeight: '60px'}}>
      I want to self-host, integrate, or extend Headvroom
    </p>
    <div style={{borderTop: '1px solid #3B3154', paddingTop: '16px', marginTop: '16px'}}>
      <a href="/developers" style={{
        display: 'block',
        padding: '12px 20px',
        backgroundColor: '#8B5CF6',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '6px',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '12px'
      }}>
        Developers Guide
      </a>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
        <a href="/features/integrations/google-drive" style={{
          display: 'block',
          padding: '8px',
          backgroundColor: '#7C3AED',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          Integrations
        </a>
        <a href="/features/embedding-sharing" style={{
          display: 'block',
          padding: '8px',
          backgroundColor: '#7C3AED',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          Embed API
        </a>
      </div>
    </div>
  </div>

  {/* Agents Card */}
  <div style={{
    border: '2px solid #F59E0B',
    borderRadius: '12px',
    padding: '24px',
    backgroundColor: '#292218',
    boxShadow: '0 2px 8px rgba(245, 158, 11, 0.2)'
  }}>
    <h3 style={{color: '#FBBF24', marginTop: 0}}>🤖 I'm an Agent</h3>
    <p style={{fontSize: '14px', color: '#94A3B8', minHeight: '60px'}}>
      I'm an AI assistant deploying or configuring Headvroom for a user
    </p>
    <div style={{borderTop: '1px solid #44371D', paddingTop: '16px', marginTop: '16px'}}>
      <a href="/agents" style={{
        display: 'block',
        padding: '12px 20px',
        backgroundColor: '#F59E0B',
        color: 'black',
        textDecoration: 'none',
        borderRadius: '6px',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: '12px'
      }}>
        Agents Guide
      </a>
      <div style={{display: 'grid', gridTemplateColumns: '1fr', gap: '8px'}}>
        <a href="/agents#15-minute-quickstart" style={{
          display: 'block',
          padding: '8px',
          backgroundColor: '#D97706',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '14px'
        }}>
          15-Minute Quickstart
        </a>
      </div>
    </div>
  </div>

</div>

<div style={{
  backgroundColor: '#1E293B',
  border: '1px solid #334155',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '40px'
}}>
  <h3 style={{marginTop: 0, color: '#E2E8F0'}}>Not Sure Where to Start?</h3>
  <ul style={{marginBottom: 0, color: '#94A3B8'}}>
    <li><strong>Just want to use the app?</strong> Start with <a href="/getting-started">Getting Started</a></li>
    <li><strong>Want to connect Google Drive?</strong> See <a href="/features/integrations/google-drive">Google Drive Integration</a></li>
    <li><strong>Self-hosting or building on top?</strong> Go to <a href="/developers">Developers Guide</a></li>
    <li><strong>You're an AI deploying this?</strong> Check <a href="/agents">Agents Guide</a> for condensed runbooks</li>
  </ul>
</div>

---

## What is Headvroom?

Headvroom is a modern knowledge graph visualization tool that helps you:

- **Organize visually** - Create nodes for ideas, topics, and resources
- **Connect everything** - Draw relationships between nodes
- **Explore naturally** - Click any node to see its connections
- **Attach rich content** - Notes, links, files, media, Google Drive folders
- **Share publicly** - Embed individual nodes on external sites

---

*Ready to get started? Choose your path above!*
