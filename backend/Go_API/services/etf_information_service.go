package services

import (
	"context"
	"encoding/json"
	"example/Go_API/models"
	"fmt"
	"os"
	"strings"

	"github.com/sashabaranov/go-openai"
)

type ETFInformationService struct {
    client *openai.Client
}

// NewETFInformationService creates a new ETF information service
func NewETFInformationService() *ETFInformationService {
    apiKey := os.Getenv("OPENAI_API_KEY")
    if apiKey == "" {
        fmt.Println("Warning: OPENAI_API_KEY environment variable not set")
    }

    return &ETFInformationService{
        client: openai.NewClient(apiKey),
    }
}

// GetETFInformation fetches ETF recommendations from OpenAI based on interest rate
func (s *ETFInformationService) GetETFInformation(interestRate float64) ([]models.ETF_Information, error) {
    // Build the prompt
    prompt := fmt.Sprintf(`Analyze the US markets and provide a list of exactly 10 ETFs that have had a historical average return close to %.2f%% over the past 5 years.

For each ETF, provide the following information in a JSON array format:
- etf_symbol: The ticker symbol of the ETF (string)
- etf_name: The full name of the ETF (string)
- etf_avg_return: The historical average return of the ETF over the past 5 years as a decimal number (float64, e.g., 8.5 for 8.5%%)
- etf_description: A brief description of the ETF's investment focus and strategy (string)

Return ONLY a valid JSON array with no additional text or markdown formatting.

Example format:
[
  {
    "etf_symbol": "SPY",
    "etf_name": "SPDR S&P 500 ETF Trust",
    "etf_avg_return": 10.5,
    "etf_description": "Tracks the S&P 500 index, providing broad exposure to large-cap US equities."
  }
]`, interestRate)

    // Make API request to OpenAI using GPT-4o-mini (best balance of speed and quality)
    ctx := context.Background()
    response, err := s.client.CreateChatCompletion(ctx, openai.ChatCompletionRequest{
        Model: "gpt-4o-mini", // Changed to gpt-4o-mini - you have 60,000 TPM!
        Messages: []openai.ChatCompletionMessage{
            {
                Role:    openai.ChatMessageRoleUser,
                Content: prompt,
            },
        },
        Temperature: 0.7,
        MaxTokens:   2000,
    })

    if err != nil {
        return nil, fmt.Errorf("failed to call OpenAI API: %w", err)
    }

    // Check if we got a response
    if len(response.Choices) == 0 {
        return nil, fmt.Errorf("no response from OpenAI API")
    }

    // Extract the content
    content := response.Choices[0].Message.Content

    // Parse the JSON response
    etfs, err := s.parseETFInformation(content)
    if err != nil {
        return nil, fmt.Errorf("failed to parse ETF information: %w", err)
    }

    return etfs, nil
}

// parseETFInformation converts the OpenAI response to ETF_Information structs
func (s *ETFInformationService) parseETFInformation(content string) ([]models.ETF_Information, error) {
    // Clean the content - remove markdown code blocks if present
    content = strings.TrimSpace(content)
    content = strings.TrimPrefix(content, "```json")
    content = strings.TrimPrefix(content, "```")
    content = strings.TrimSuffix(content, "```")
    content = strings.TrimSpace(content)

    // Parse JSON into our model
    var etfs []models.ETF_Information
    if err := json.Unmarshal([]byte(content), &etfs); err != nil {
        fmt.Println("Error parsing JSON. Content received:")
        fmt.Println(content)
        return nil, fmt.Errorf("invalid JSON format: %w", err)
    }

    // Validate we got some results
    if len(etfs) == 0 {
        return nil, fmt.Errorf("no ETF information returned")
    }

    return etfs, nil
}