/* eslint-disable unicorn/filename-case */
import { Text, View } from 'react-native';

import { cn } from '@/lib/utils';

function Card({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn('rounded-xl border border-border', className)}
      {...props}
    />
  );
}

function CardHeader({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('p-4', className)} {...props} />;
}

function CardTitle({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) {
  return (
    <Text
      className={cn(
        'text-2xl font-semibold tracking-tight text-primary',
        className
      )}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text>) {
  return (
    <Text
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardContent({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn('p-4 pt-0', className)} {...props} />;
}

// TODO: style
function CardFooter({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View>) {
  return (
    <View
      className={cn(className, 'flex flex-row items-center p-4 pt-0')}
      {...props}
    />
  );
}

interface SimpleCardProps {
  className?: string;
  title?: string;
  description?: string;
  content?: string;
  footer?: string;
}
function SimpleCard({
  className,
  title,
  description,
  content,
  footer,
}: SimpleCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        {title && (
          <Text className="text-primary text-2xl font-semibold tracking-tight">
            {title}
          </Text>
        )}
        {description && (
          <Text className="text-muted-foreground text-sm">{description}</Text>
        )}
      </CardHeader>
      {content && (
        <CardContent>
          <Text className="text-primary text-base">{content}</Text>
        </CardContent>
      )}
      {footer && (
        <CardFooter>
          <Text className="text-muted-foreground text-sm">{footer}</Text>
        </CardFooter>
      )}
    </Card>
  );
}

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  SimpleCard,
};
