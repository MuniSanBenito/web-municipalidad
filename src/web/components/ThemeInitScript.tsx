export function ThemeInitScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if(theme){
      document.documentElement.setAttribute('data-theme', theme);
    }
  } catch(e){}
})();
        `.trim(),
      }}
    />
  );
}
