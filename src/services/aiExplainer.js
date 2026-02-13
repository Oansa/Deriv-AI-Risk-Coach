import { HfInference } from "@huggingface/inference";

class AIExplainer {
    constructor(hfToken) {
        this.hfToken = hfToken;
        this.client = hfToken ? new HfInference(hfToken) : null;
    }

    async explainRisk(risk, tradeContext) {
        if (!this.client) {
            return this.getDemoExplanation(risk);
        }

        try {
            const prompt = this.buildPrompt(risk, tradeContext);

            const response = await this.client.chatCompletion({
                model: "meta-llama/Llama-3.1-8B-Instruct",
                messages: [
                    {
                        role: "system",
                        content: "You are a friendly, experienced trading risk coach. Explain trading risks in simple, conversational language. Be empathetic but direct. Give specific, actionable advice."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 300,
                temperature: 0.7
            });

            const aiText = response.choices[0].message.content;

            return {
                explanation: aiText,
                severity: risk.severity,
                type: risk.type
            };

        } catch (error) {
            console.error("AI explanation failed:", error);
            return this.getDemoExplanation(risk);
        }
    }

    buildPrompt(risk, tradeContext) {
        const recentTrades = tradeContext.slice(0, 5);

        return `A trader has the following risk pattern detected:

Risk Type: ${risk.type}
Severity: ${risk.severity}
Pattern: ${risk.message}

Recent trades:
${recentTrades.map((t, i) => `${i + 1}. ${t.symbol} - Stake: $${t.buy_price} - P/L: $${t.profit.toFixed(2)}`).join('\n')}

Explain this risk in 2-3 friendly sentences, then give specific advice on what they should do differently. Be conversational and supportive.`;
    }

    getDemoExplanation(risk) {
        const demoExplanations = {
            martingale: {
                explanation: "Hey, I noticed you're doubling your stakes after losses. This is called Martingale strategy, and it's one of the riskiest approaches in trading. Even professional traders avoid this because a small losing streak can wipe out your entire account in minutes. The math works against you - you risk huge amounts to win small profits.",
                advice: "Switch to fixed stakes immediately. If you lose 2-3 trades in a row, stop trading and take a break. Never try to 'win back' losses by increasing your risk.",
                severity: "high",
                type: "martingale"
            },

            overtrading: {
                explanation: "You're trading very frequently - I'm seeing 5+ trades in just 5 minutes. This pattern usually indicates emotional or impulsive decisions rather than careful analysis. When we trade too fast, we stop thinking strategically and start reacting emotionally, especially after losses.",
                advice: "Set a rule: minimum 5-10 minutes between trades. Use that time to analyze the market properly and confirm your strategy. Quality over quantity always wins in trading.",
                severity: "medium",
                type: "overtrading"
            },

            loss_streak: {
                explanation: "You've had several losses in a row, which is completely normal in trading. However, continuing to trade during a losing streak often makes things worse. Our emotions take over, and we start making desperate decisions to 'get back to even.'",
                advice: "Take a 1-hour break right now. When you come back, review what went wrong with fresh eyes. Consider reducing your stake size by 50% for the next few trades until you rebuild confidence.",
                severity: "medium",
                type: "loss_streak"
            },

            bot_risk: {
                explanation: "Your DBot is using an automated Martingale or aggressive doubling strategy. While automation sounds good, these bots can drain your account faster than manual trading because they execute trades without hesitation. They don't feel fear when things go wrong - they just keep doubling.",
                advice: "Stop the bot immediately. If you want to use automation, switch to a fixed-stake strategy where the bot never increases position size. Better yet, trade manually with strict rules until you're consistently profitable.",
                severity: "high",
                type: "bot_risk"
            },

            position_sizing: {
                explanation: "Your position sizes are too large relative to your account balance. You're risking more than 5% per trade, which is way above the 1-2% that professional traders recommend. This means a few bad trades could seriously damage your account.",
                advice: "Calculate 1-2% of your account balance and use that as your maximum stake. If your balance is $1000, never risk more than $10-20 per trade. It feels small, but it's how you survive long enough to become profitable.",
                severity: "medium",
                type: "position_sizing"
            }
        };

        return demoExplanations[risk.type] || {
            explanation: "I've detected a risky pattern in your trading. This could lead to significant losses if not addressed.",
            advice: "Review your recent trades carefully. Consider taking a break and reassessing your strategy.",
            severity: risk.severity,
            type: risk.type
        };
    }

    async generateRiskSummary(allRisks, accountData) {
        if (allRisks.length === 0) {
            return {
                summary: "Great job! Your trading looks disciplined and well-managed. Keep following your strategy and maintaining consistent position sizes.",
                level: "safe"
            };
        }

        if (!this.client) {
            return this.getDemoSummary(allRisks, accountData);
        }

        try {
            const prompt = `A trader has ${allRisks.length} risk issues detected:

${allRisks.map((r, i) => `${i + 1}. ${r.type}: ${r.message}`).join('\n')}

Account Balance: $${accountData.balance}
Open Trades: ${accountData.openTrades}

Give an overall assessment in 2-3 sentences and list the top 3 actions they should take RIGHT NOW.`;

            const response = await this.client.chatCompletion({
                model: "meta-llama/Llama-3.1-8B-Instruct",
                messages: [
                    {
                        role: "system",
                        content: "You are a trading coach giving an overall risk assessment. Be direct but supportive."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                max_tokens: 400
            });

            return {
                summary: response.choices[0].message.content,
                level: allRisks.some(r => r.severity === 'high') ? 'danger' : 'warning'
            };

        } catch (error) {
            console.error("Summary generation failed:", error);
            return this.getDemoSummary(allRisks, accountData);
        }
    }

    getDemoSummary(allRisks, accountData) {
        const highRisks = allRisks.filter(r => r.severity === 'high');

        if (highRisks.length > 0) {
            return {
                summary: `⚠️ URGENT: You have ${highRisks.length} high-risk pattern(s) detected. Your account is in danger. These patterns typically lead to rapid account depletion. Stop trading immediately and review the warnings below.`,
                level: 'danger'
            };
        }

        return {
            summary: `⚡ You have ${allRisks.length} risk warning(s). While not immediately dangerous, these patterns reduce your chances of long-term success. Address them before they become habits.`,
            level: 'warning'
        };
    }
}

export default AIExplainer;
