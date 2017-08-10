import React from 'react';
import { TYPE_NAME, TYPE_DESC } from '../constants/replyType';
import moment from 'moment';
import ExpandableText from './ExpandableText';
import { nl2br } from '../util/text';

function ReplyItem({ reply, connectionAuthor, feedbackCount }) {
  const replyVersion = reply.getIn(['versions', 0]);
  const createdAt = moment(replyVersion.get('createdAt'));
  return (
    <li className="root">
      <header className="section">
        {connectionAuthor ? connectionAuthor.get('name') : '有人'}
        標記此篇為：<strong title={TYPE_DESC[replyVersion.get('type')]}>
          {TYPE_NAME[replyVersion.get('type')]}
        </strong>
      </header>
      <section className="section">
        <h3>理由</h3>
        <ExpandableText>{replyVersion.get('text')}</ExpandableText>
      </section>
      <section className="section">
        <h3>出處</h3>
        {replyVersion.get('reference')
          ? nl2br(replyVersion.get('reference'))
          : '⚠️️ 此回應沒有出處，請自行斟酌回應真實性。'}
      </section>
      <footer>
        <span title={createdAt.format('lll')}>{createdAt.fromNow()}</span>
        <span title="Coming soon!">・{feedbackCount} 人評價了這則回應</span>
      </footer>

      <style jsx>{`
        .root {
          padding: 24px;
          border: 1px solid #ccc;
          border-top: 0;
          &:first-child {
            border-top: 1px solid #ccc;
          }
          &:hover {
            background: rgba(0, 0, 0, .05);
          }
        }
        h3 {
          margin: 0;
        }
        .section {
          padding-bottom: 8px;
          margin-bottom: 8px;
          border-bottom: 1px dotted rgba(0, 0, 0, .2);
        }
      `}</style>
    </li>
  );
}

export default function CurrentReplies({ replyConnections }) {
  if (!replyConnections.size) {
    return <p>目前尚無回應</p>;
  }

  return (
    <ul className="items">
      {replyConnections.map(conn =>
        <ReplyItem
          key={conn.get('id')}
          id={conn.get('id')}
          reply={conn.get('reply')}
          connectionAuthor={conn.get('user')}
          feedbackCount={conn.get('feedbackCount')}
        />
      )}
      <style jsx>{`
        .items {
          list-style-type: none;
          padding-left: 0;
        }
      `}</style>
    </ul>
  );
}