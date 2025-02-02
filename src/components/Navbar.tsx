import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@heroui/react";

export default function NavBar() {
  const speak = (message: string) => {
    if (!message.trim()) return;
    speechSynthesis.cancel(); // Stop ongoing speech
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
      <img src="/logo.png" alt="logo" className="w-12 h-16" />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="primary" href="#" onPress={() => speak("Welcome to Necta Results Portal. Simply enter your registration number to get your results")} className="bg-yellow-300 rounded-md text-white font-bold" variant="flat">
           Translate
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
