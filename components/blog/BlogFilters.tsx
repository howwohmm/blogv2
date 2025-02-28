'use client'

import React from 'react'

interface Topic {
  name: string
  count: number
  category?: string
}

const TOPICS: Topic[] = [
  { name: 'AWS', count: 8 },
  { name: 'Enterprise', count: 1 },
  { name: 'Getting Started', count: 3 },
  { name: 'Connect', count: 3 },
  { name: 'Sandboxes', count: 9 },
  { name: 'Billing', count: 1 },
  { name: 'Payment Methods', count: 6 },
  { name: 'Event Destinations', count: 3 },
  { name: 'Billings', count: 3 },
  { name: 'Community', count: 1 },
  { name: 'Workbench', count: 17 },
  { name: 'Serverless', count: 1 },
  { name: 'Workflow', count: 1 },
  { name: 'Stripe Apps', count: 1 },
  { name: 'Error Handling', count: 2 },
  { name: 'Dev Digest', count: 2 },
  { name: 'Invoicing', count: 2 },
  { name: 'Payment Intents', count: 1 },
]

interface BlogFiltersProps {
  selectedTopics: string[]
  onTopicChange: (topics: string[]) => void
}

export default function BlogFilters({ selectedTopics, onTopicChange }: BlogFiltersProps) {
  const toggleTopic = (topicName: string) => {
    if (selectedTopics.includes(topicName)) {
      onTopicChange(selectedTopics.filter(t => t !== topicName))
    } else {
      onTopicChange([...selectedTopics, topicName])
    }
  }

  return (
    <div className="filter-section">
      <div className="mb-6">
        <h2 className="font-mono text-[12px] text-[#697386] mb-4">/ FILTERS</h2>
        <div className="relative">
          <div className="flex items-center cursor-pointer">
            <span className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 2h10M2 7h10M2 12h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="font-mono text-[12px] uppercase">Topic</span>
            </span>
          </div>
          <div className="mt-3 space-y-1">
            {TOPICS.map((topic) => (
              <label
                key={topic.name}
                className="flex items-center py-1 cursor-pointer group text-[13px] text-[#697386] hover:text-[#1a1f36]"
              >
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic.name)}
                  onChange={() => toggleTopic(topic.name)}
                  className="mr-2"
                />
                <span className="flex-1">{topic.name}</span>
                <span className="text-[#697386] text-[12px]">({topic.count})</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="w-[120px] h-[120px] border border-[#e6ebf1] rounded-sm p-2">
          <div className="w-full h-full bg-[#f6f9fc] rounded-sm"></div>
        </div>
      </div>
    </div>
  )
} 