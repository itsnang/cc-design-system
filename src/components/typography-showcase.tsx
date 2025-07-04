import React from "react";
import {
  Typography,
  H1,
  H2,
  H3,
  H4,
  H5,
  Body1,
  Body2,
  Body3,
  BaseText,
  MediumText,
  BoldText,
  Label,
} from "@/components/ui/typography";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const TypographyShowcase: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-12">
        <H1 responsive className="mb-4">
          Typography System Showcase
        </H1>
        <Body1 responsive className="text-gray-600">
          Comprehensive typography system using Mulish font with responsive
          variants
        </Body1>
      </div>

      {/* English Typography */}
      <Card>
        <CardHeader>
          <CardTitle>Typography System (Mulish)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label className="text-gray-500 mb-2 block">Headings</Label>
              <div className="space-y-2">
                <H1>H1 - Main Heading (44px/28px mobile)</H1>
                <H2>H2 - Section Heading (36px/24px mobile)</H2>
                <H3>H3 - Subsection Heading (32px/24px mobile)</H3>
                <H4>H4 - Minor Heading (24px/20px mobile)</H4>
                <H5>H5 - Small Heading (20px/18px mobile)</H5>
              </div>
            </div>

            <div>
              <Label className="text-gray-500 mb-2 block">Body Text</Label>
              <div className="space-y-2">
                <Body1>
                  Body 1 - Primary body text for main content areas. Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit. (20px/16px
                  mobile)
                </Body1>
                <Body2>
                  Body 2 - Secondary body text for supporting content. Sed do
                  eiusmod tempor incididunt ut labore. (18px/16px mobile)
                </Body2>
                <Body3>
                  Body 3 - Tertiary body text for captions and smaller content.
                  Ut enim ad minim veniam, quis nostrud. (16px/14px mobile)
                </Body3>
              </div>
            </div>

            <div>
              <Label className="text-gray-500 mb-2 block">
                Base Text & Labels
              </Label>
              <div className="space-y-2">
                <BaseText>Base text - Regular (16px/14px mobile)</BaseText>
                <MediumText>
                  Base Medium - Medium weight (16px/14px mobile)
                </MediumText>
                <BoldText>Base Bold - Bold weight (16px/14px mobile)</BoldText>
                <Label>
                  Label - For form labels and UI elements (14px/12px mobile)
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Typography Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Responsive Typography</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-500 mb-2 block">
              These automatically adjust between desktop and mobile sizes
            </Label>
            <Typography variant="h1" responsive>
              Responsive H1 - Changes size based on screen width
            </Typography>
            <Typography variant="body1" responsive>
              Responsive body text that adapts to screen size for optimal
              readability across different devices and viewports.
            </Typography>
          </div>
        </CardContent>
      </Card>

      {/* Typography Specifications */}
      <Card>
        <CardHeader>
          <CardTitle>Typography Specifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Desktop Sizes</h4>
              <div className="space-y-1 text-sm">
                <div>H1: Bold, 44px</div>
                <div>H2: Bold, 36px</div>
                <div>H3: Bold, 32px</div>
                <div>H4: Bold, 24px</div>
                <div>H5: Bold, 20px</div>
                <div>Body 1: Regular, 20px, 28px line-height</div>
                <div>Body 2: Regular, 18px, 26px line-height</div>
                <div>Body 3: Regular, 16px, 24px line-height</div>
                <div>Base: Regular, 16px</div>
                <div>Base Medium: Medium, 16px</div>
                <div>Base Bold: Bold, 16px</div>
                <div>Label: Bold, 14px</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Mobile Sizes</h4>
              <div className="space-y-1 text-sm">
                <div>H1: Bold, 28px</div>
                <div>H2: Bold, 24px</div>
                <div>H3: Bold, 24px</div>
                <div>H4: Bold, 20px</div>
                <div>H5: Bold, 18px</div>
                <div>Body 1: Regular, 16px, 22px line-height</div>
                <div>Body 2: Regular, 16px, 22px line-height</div>
                <div>Body 3: Regular, 14px, 22px line-height</div>
                <div>Base: Regular, 14px</div>
                <div>Base Medium: Medium, 14px</div>
                <div>Base Bold: Bold, 14px</div>
                <div>Label: Bold, 12px</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-50 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              {`// Basic usage
<Typography variant="h1">English heading</Typography>

// Responsive (auto mobile/desktop)
<Typography variant="h1" responsive>Responsive heading</Typography>

// Convenience components
<H1 responsive>Main heading</H1>
<Body1 responsive>Body text content</Body1>

// Custom styling
<Typography variant="body1" className="text-blue-600 mb-4">
  Styled text
</Typography>`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
