/** A sign-up form with a name field and the email field the E2E fills. */
export function Page(): React.JSX.Element {
  return (
    <main>
      <h1>회원 가입</h1>
      <label>
        이름 <input />
      </label>
      <label>
        이메일 <input type="email" />
      </label>
    </main>
  );
}
