export interface SubmitButtonProps {
  text: string;
  type?: 'submit' | 'button';
  disabled?: boolean; 
  onClick?: () => void;
  route?: string; 
}