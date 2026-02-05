import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, Award, Building2 } from 'lucide-react';

export default function PricingCalculator() {
  const [partner, setPartner] = useState('');
  const [incumbentPrice, setIncumbentPrice] = useState('');
  const [contractDate, setContractDate] = useState('');
  const [dealType, setDealType] = useState('new-logo');

  // Partner tier mapping
  const partnerTiers = {
    'CDW': 'enterprise',
    'Trafera': 'growth',
    'Bluum': 'growth',
    'SHI': 'growth',
    'Howard': 'growth',
    'BorderLAN': 'growth',
    'OETC': 'growth',
    'UDT': 'growth',
    'Connection': 'territory',
    'Fortnet Security': 'territory',
    'Journey Ed': 'territory',
    'Logisoft': 'territory',
    'Stryke Security Inc': 'territory',
    'STS Education': 'territory',
    'TIG': 'territory',
    'Twotrees Technologies': 'territory',
    'Whalley Computer Associates Inc': 'territory',
    'WIRED! Technology Partners': 'territory'
  };

  const partners = [
    'Bluum',
    'BorderLAN',
    'CDW',
    'Connection',
    'Fortnet Security',
    'Howard',
    'Journey Ed',
    'Logisoft',
    'OETC',
    'SHI',
    'Stryke Security Inc',
    'STS Education',
    'TIG',
    'Trafera',
    'Twotrees Technologies',
    'UDT',
    'Whalley Computer Associates Inc',
    'WIRED! Technology Partners',
    'Other (Authorized)'
  ];

  const getPartnerTier = (partnerName) => {
    if (!partnerName) return null;
    return partnerTiers[partnerName] || 'authorized';
  };

  const getTierDisplayName = (tier) => {
    const tierNames = {
      'enterprise': 'Enterprise Partner',
      'growth': 'Growth Partner',
      'territory': 'Territory Partner',
      'authorized': 'Authorized Partner'
    };
    return tierNames[tier] || '';
  };

  const calculatePricing = () => {
    if (!partner || !incumbentPrice || !contractDate) {
      return null;
    }

    const price = parseFloat(incumbentPrice);
    if (isNaN(price) || price <= 0) {
      return null;
    }

    const selectedDate = new Date(contractDate);
    const legacyCutoff = new Date('2026-02-09');
    const isLegacy = selectedDate < legacyCutoff;

    const partnerTier = getPartnerTier(partner);
    let discountRate = 0;

    if (partnerTier === 'enterprise' || partnerTier === 'growth') {
      // Enterprise and Growth: 25%, 20%, 15%
      if (isLegacy) {
        discountRate = 0.15;
      } else if (dealType === 'new-logo' || dealType === 'cross-sell') {
        discountRate = 0.25;
      } else if (dealType === 'renewal') {
        discountRate = 0.20;
      }
    } else if (partnerTier === 'territory') {
      // Territory: 20%, 15%, 15%
      if (isLegacy) {
        discountRate = 0.15;
      } else if (dealType === 'new-logo' || dealType === 'cross-sell') {
        discountRate = 0.20;
      } else if (dealType === 'renewal') {
        discountRate = 0.15;
      }
    } else if (partnerTier === 'authorized') {
      // Authorized: 15%, 15%, 15%
      discountRate = 0.15;
    }

    const discountAmount = price * discountRate;
    const nonIncumbentPrice = price + discountAmount;

    return {
      incumbentPrice: price,
      discountRate: discountRate * 100,
      discountAmount: discountAmount,
      nonIncumbentPrice: nonIncumbentPrice,
      dealType: dealType,
      isLegacy: isLegacy,
      partnerTier: partnerTier,
      partnerName: partner
    };
  };

  const result = calculatePricing();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                <h1 className="text-3xl font-bold">GoGuardian Price Protection Calculator</h1>
              </div>
              <div className="text-blue-100 text-sm font-semibold">v1.15</div>
            </div>
            <p className="text-blue-100 mb-3">Calculate competitive pricing with partner tier discounts</p>
            <p className="text-blue-200 text-sm italic leading-relaxed">
              Note: Price protection sets the floor price we won't quote under—it's not the customer price. 
              Resellers set their own margins, and many choose to price well below their protection level.
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Row 1: Partner Selection and Partner Tier */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Building2 className="w-4 h-4" />
                  Partner
                </label>
                <select
                  value={partner}
                  onChange={(e) => setPartner(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                >
                  <option value="">Select a partner...</option>
                  {partners.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Award className="w-4 h-4" />
                  Partner Tier
                </label>
                <div className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg bg-gray-50 flex items-center">
                  {partner ? (
                    <span className="font-semibold text-gray-900">
                      {getTierDisplayName(getPartnerTier(partner))}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">Select a partner first</span>
                  )}
                </div>
              </div>

              {/* Row 2: Deal Type and Incumbent Price */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Award className="w-4 h-4" />
                  Deal Type
                </label>
                <select
                  value={dealType}
                  onChange={(e) => setDealType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                >
                  <option value="new-logo">New Logo</option>
                  <option value="cross-sell">Cross-Sell</option>
                  <option value="renewal">Renewal and Expansion</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4" />
                  Incumbent Price
                </label>
                <input
                  type="number"
                  value={incumbentPrice}
                  onChange={(e) => setIncumbentPrice(e.target.value)}
                  placeholder="Enter incumbent price"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  step="0.01"
                  min="0"
                />
              </div>

              {/* Row 3: Contract Date and Non-Incumbent Price */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <Calendar className="w-4 h-4" />
                  Original Contract Date
                </label>
                <input
                  type="date"
                  value={contractDate}
                  onChange={(e) => setContractDate(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
                  style={{ minHeight: '48px', WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none', backgroundColor: 'white' }}
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                  <DollarSign className="w-4 h-4" />
                  Non-Incumbent Price
                </label>
                <div className={`w-full px-4 py-3 border-2 rounded-lg flex items-center ${result ? 'bg-green-50 border-green-300' : 'bg-gray-50 border-gray-200'}`}>
                  {result ? (
                    <span className="text-2xl font-bold text-green-700">
                      {formatCurrency(result.nonIncumbentPrice)}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">Fill all fields above</span>
                  )}
                </div>
                {result && result.isLegacy && (
                  <p className="mt-1 text-xs text-amber-700 font-semibold">
                    ⚠️ Legacy deal (before Feb 9, 2026)
                  </p>
                )}
                {result && (
                  <p className="mt-1 text-xs text-gray-600">
                    {result.discountRate}% price protection applied
                  </p>
                )}
              </div>
            </div>

            {/* Partner Positioning Language */}
            {result && (
              <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200 shadow-md">
                <h3 className="font-semibold text-purple-900 mb-4 flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5" />
                  Partner Positioning Language
                </h3>
                
                <div className="space-y-6">
                  {/* Non-Incumbent Partner Framing */}
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 text-sm uppercase tracking-wide">
                      If another (non-incumbent) partner asks for pricing:
                    </h4>
                    <p className="text-gray-800 text-sm leading-relaxed">
                      Quote no lower than <span className="font-bold text-green-700">{formatCurrency(result.nonIncumbentPrice)}</span> per license ({result.discountRate}% price protection applied).
                    </p>
                  </div>

                  {/* Incumbent Partner Framing */}
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 text-sm uppercase tracking-wide">
                      Incumbent Partner Framing:
                    </h4>
                    <p className="text-gray-800 text-sm leading-relaxed italic">
                      "You're priced at <span className="font-bold text-blue-700">{formatCurrency(result.incumbentPrice)}</span> with {result.discountRate}% protection, so you're covered up to about <span className="font-bold text-green-700">{formatCurrency(result.nonIncumbentPrice)}</span>. Even if the district comes to us directly, we won't go under your protected level. And of course, if anything ever feels off-track in the account, we'll connect with you so we're aligned on the right next steps."
                    </p>
                  </div>

                  {/* Non-Incumbent Partner Framing */}
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-900 mb-2 text-sm uppercase tracking-wide">
                      Non-Incumbent Partner Framing:
                    </h4>
                    <p className="text-gray-800 text-sm leading-relaxed italic">
                      "We have an existing partner relationship with this account. To maintain fairness across our partner ecosystem, the floor price we can offer is <span className="font-bold text-green-700">{formatCurrency(result.nonIncumbentPrice)}</span> per license. This ensures we're supporting all our partners equitably while giving you a competitive opportunity to earn the business."
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pricing Rules */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5" />
                Partner Pricing Rules
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Enterprise Partners (CDW)</h4>
                  <ul className="space-y-1 text-sm text-blue-800 ml-4">
                    <li>• New Logo/Cross-Sell: 25% price protection</li>
                    <li>• Renewals and Expansions: 20% price protection</li>
                    <li>• Legacy Deals: 15% price protection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Growth Partners (Trafera, Bluum, SHI, Howard, BorderLAN, OETC, UDT)</h4>
                  <ul className="space-y-1 text-sm text-blue-800 ml-4">
                    <li>• New Logo/Cross-Sell: 25% price protection</li>
                    <li>• Renewals and Expansions: 20% price protection</li>
                    <li>• Legacy Deals: 15% price protection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Territory Partners (Connection, Fortnet Security, Journey Ed, and more)</h4>
                  <ul className="space-y-1 text-sm text-blue-800 ml-4">
                    <li>• New Logo/Cross-Sell: 20% price protection</li>
                    <li>• Renewals and Expansions: 15% price protection</li>
                    <li>• Legacy Deals: 15% price protection</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Authorized Partners (All others)</h4>
                  <ul className="space-y-1 text-sm text-blue-800 ml-4">
                    <li>• All deal types: 15% price protection</li>
                  </ul>
                </div>
                <p className="text-xs text-blue-700 italic mt-3">
                  * Legacy deals are contracts that began before February 9, 2026
                </p>
              </div>
            </div>

            {/* Results */}
            {result && (
              <div className="mt-8 p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-2 border-green-200 shadow-lg">
                <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
                  <Calculator className="w-6 h-6" />
                  Pricing Calculation
                </h2>
                
                {result.isLegacy && (
                  <div className="mb-4 p-3 bg-amber-100 border-2 border-amber-300 rounded-lg">
                    <p className="text-sm font-semibold text-amber-900">
                      ⚠️ Legacy Deal - Contract date before February 10, 2025
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-green-200">
                    <span className="font-semibold text-gray-700">Partner:</span>
                    <span className="text-lg font-bold text-gray-900">
                      {result.partnerName}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-green-200">
                    <span className="font-semibold text-gray-700">Partner Tier:</span>
                    <span className="text-lg font-bold text-gray-900 capitalize">
                      {getTierDisplayName(result.partnerTier)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-green-200">
                    <span className="font-semibold text-gray-700">Deal Type:</span>
                    <span className="text-lg font-bold text-gray-900 capitalize">
                      {result.dealType.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-green-200">
                    <span className="font-semibold text-gray-700">Incumbent Price:</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatCurrency(result.incumbentPrice)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-green-200">
                    <span className="font-semibold text-gray-700">Price Protection:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {result.discountRate}%
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-3 border-b border-green-200">
                    <span className="font-semibold text-gray-700">Discount Amount:</span>
                    <span className="text-lg font-bold text-red-600">
                      -{formatCurrency(result.discountAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-4 bg-green-100 rounded-lg px-4 mt-4">
                    <span className="text-xl font-bold text-green-900">Non-Incumbent Price:</span>
                    <span className="text-3xl font-bold text-green-700">
                      {formatCurrency(result.nonIncumbentPrice)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
